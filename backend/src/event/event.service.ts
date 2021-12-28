import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addHours, endOfDay, getHours, hoursToMinutes, isAfter, isSunday, parseISO, startOfDay, startOfHour, startOfToday, subHours } from 'date-fns';
import { Op as $ } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { CreateEventDTO, FilterEventDTO, UpdateEventDTO } from './event.dto';
import { Event } from './event.model';
import { UploadService } from '../config/upload.service';
import { convertBool, trimObj } from '../utils';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event,
    private sequelize: Sequelize,
    private upload: UploadService
  ) { }

  async get(query?: FilterEventDTO) {
    trimObj(query);
    const where = {};

    if (query.date) {
      const searchDate = parseISO(query.date);
      if (isAfter(startOfToday(), searchDate)) throw new HttpException('Data passada não permitida', 400);

      Object.assign(where, {
        date: {
          [$.between]: [
            startOfDay(searchDate),
            endOfDay(searchDate)
          ]
        }
      });
    }

    return await this.eventModel.findAll({
      paranoid: !convertBool(query.inactives),
      order: [['date', 'ASC']],
      where,
    });
  }

  async findById(id: number, inactives?: 'true' | 'false') {
    const event = await this.eventModel.findByPk(id, { paranoid: !convertBool(inactives) });

    if (!event) throw new HttpException("Evento não encontrado", 404);

    return event;
  }

  async availableDate(date: Date) {
    return await this.eventModel.findOne({
      where: {
        date: {
          [$.between]: [
            subHours(startOfHour(date), 1),
            addHours(startOfHour(date), 1),
          ]
        }
      }
    });
  }

  async post(data: CreateEventDTO, media: Express.Multer.File) {
    trimObj(data);

    if (!media) throw new HttpException('Imagem é obrigatória', 400);

    const image = this.upload.post(media);
    Object.assign(data, { image });

    const date = parseISO(data.date);

    const minutes = hoursToMinutes(getHours(date));

    switch (true) {
      case isAfter(new Date(), date):
        throw new HttpException('Data passada não permitida', 400);
      case isSunday(date):
        throw new HttpException('Eventos não podem ser realizados aos domingos', 400);
      case minutes < 480:
      case minutes > 1080:
        throw new HttpException('Horário de início do evento deve ocorrer entre 8h e 18h', 400);
      default:
        break;
    }

    if (await this.availableDate(date)) throw new HttpException('Data de evento indisponível', 400);

    const transaction = await this.sequelize.transaction();

    try {
      const event = await this.eventModel.create({
        ...data,
        date: String(startOfHour(date))
      }, { transaction });

      await transaction.commit();

      return event;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async put(id: number, data: UpdateEventDTO, media?: Express.Multer.File) {
    trimObj(data);

    const event = await this.findById(id);

    const date = parseISO(data.date || String(event.date));

    const minutes = hoursToMinutes(getHours(date));

    if (media) {
      const image = this.upload.post(media);
      Object.assign(data, { image });
    }

    switch (true) {
      case isAfter(new Date(), date):
        throw new HttpException('Data passada não permitida', 400);
      case isSunday(date):
        throw new HttpException('Eventos não podem ser realizados aos domingos', 400);
      case minutes < 480:
      case minutes > 1080:
        throw new HttpException('Horário de início do evento deve ocorrer entre 8h e 18h', 400);
      default:
        break;
    }

    if (await this.availableDate(date)) throw new HttpException('Data de evento indisponível', 400);

    const transaction = await this.sequelize.transaction();

    try {
      await event.update({
        ...data,
        date: startOfHour(date)
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async activeInactive(id: number, status: 'true' | 'false') {
    const st = convertBool(status);

    const event = await this.findById(id, 'true');

    if (!st) return await event.destroy();
    return await event.restore();
  }
}