import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { endOfDay, format, isAfter, isBefore, isValid, isWeekend, parseISO, setHours, setMinutes, setSeconds, startOfDay, startOfHour, startOfToday } from 'date-fns';
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

    if (!convertBool(query.past)) Object.assign(where, { date: { [$.gte]: startOfHour(new Date()) } });
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

  async available(date: string) {
    const schedule = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ];

    const searchDate = parseISO(date), today = startOfToday();

    switch (true) {
      case !date:
        throw new HttpException('Data é obrigatória', 400);
      case !isValid(searchDate):
        throw new HttpException('Data inválida', 400);
      case isBefore(searchDate, today):
        throw new HttpException('Impossível agendar em uma data passada', 400);
      default:
        break;
    }

    const events = await this.eventModel.findAll({
      where: {
        date: {
          [$.between]: [
            startOfDay(searchDate),
            endOfDay(searchDate),
          ]
        }
      }
    });

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':').map(Number);
      const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available: isAfter(value, new Date()) && !events.find(event => format(event.date, "HH:mm") === time)
      };
    });

    return available;
  }

  async findById(id: number, inactives?: 'true' | 'false') {
    const event = await this.eventModel.findByPk(id, { paranoid: !convertBool(inactives) });

    if (!event) throw new HttpException("Evento não encontrado", 404);

    return event;
  }

  async availableDate(date: Date) {
    return await this.eventModel.findOne({
      where: { date }
    });
  }

  async post(data: CreateEventDTO, media: Express.Multer.File) {
    trimObj(data);

    if (!media) throw new HttpException('Imagem é obrigatória', 400);

    const image = this.upload.post(media);
    Object.assign(data, { image });

    const date = startOfHour(parseISO(data.date));

    switch (true) {
      case isAfter(new Date(), date):
        throw new HttpException('Data passada não permitida', 400);
      case isWeekend(date):
        throw new HttpException('Eventos não podem ser realizados aos fins de semana', 400);
      default:
        break;
    }

    if (await this.availableDate(date)) throw new HttpException('Data de evento indisponível', 400);

    const transaction = await this.sequelize.transaction();

    try {
      const event = await this.eventModel.create({
        ...data,
        date: String(date)
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

    if (media) {
      const image = this.upload.post(media);
      Object.assign(data, { image });
    }

    const date = startOfHour(parseISO(data.date || String(event.date)));

    switch (true) {
      case isAfter(new Date(), date):
        throw new HttpException('Data passada não permitida', 400);
      case isWeekend(date):
        throw new HttpException('Eventos não podem ser realizados aos fins de semana', 400);
      default:
        break;
    }

    if (await this.availableDate(date)) throw new HttpException('Data de evento indisponível', 400);

    const transaction = await this.sequelize.transaction();

    try {
      await event.update({
        ...data,
        date: String(date)
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