import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isValid, isWeekend, parseISO } from 'date-fns';

import { ICreateEvent, IUpdateEvent } from '.';
import { Event } from './event.model';
import { convertHour, emptyFields, trimObj } from '../utils';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event)
    private readonly eventModel: typeof Event
  ) { }

  async get() {
    return await this.eventModel.findAll();
  }

  async getAll() {
    return await this.eventModel.scope("all").findAll();
  }

  async getById(id: number) {
    const event = await this.eventModel.findByPk(id);

    if (!event) throw new HttpException("Evento não encontrado", 404);

    return event;
  }

  async post(data: ICreateEvent, image: Express.Multer.File) {
    trimObj(data);

    if (emptyFields(data) || !image) throw new HttpException("Há campos vazios", 400);

    const { initHour, endHour } = data;

    const date = parseISO(data.date);
    const init = convertHour(initHour);
    const end = convertHour(endHour);

    switch (true) {
      case !isValid(date):
        throw new HttpException("Data inválida", 400);
      case isWeekend(date):
        throw new HttpException("Evento não pode ocorrer aos fins de semana", 400);
      case init >= end:
        throw new HttpException("Hora inicial não pode ser igual após a hora final", 400);
      case (end - init) < 30:
        throw new HttpException("Evento não tem a duração mínima de 30 minutos", 400);
      case init < 480:
      case init > 1170:
        throw new HttpException("Evento não pode iniciar antes de 08:00 ou após as 19:30", 400);
      case end < 510:
      case end > 1200:
        throw new HttpException("Evento não pode finalizar antes de 08:30 ou após as 20:00", 400);
      default:
        break;
    }

    const event = await this.eventModel.create({
      ...data,
      image: image.filename
    });

    return event;
  }

  async put(id: number, data: IUpdateEvent, image: Express.Multer.File) {
    const event = await this.getById(id);

    trimObj(data);

    const { initHour, endHour } = data;

    if (emptyFields(data) || image && !image) throw new HttpException("Há campos vazios", 400);

    const init = convertHour(initHour || event.initHour);
    const end = convertHour(endHour || event.endHour);

    if (data.date) {
      const date = parseISO(data?.date);
      if (!isValid(date)) throw new HttpException("Data inválida", 400);
      if (isWeekend(date)) throw new HttpException("Evento não pode ocorrer aos fins de semana", 400);
    }

    switch (true) {
      case init >= end:
        throw new HttpException("Hora inicial não pode ser igual após a hora final", 400);
      case (end - init) < 30:
        throw new HttpException("Evento não tem a duração mínima de 30 minutos", 400);
      case init < 480:
      case init > 1170:
        throw new HttpException("Evento não pode iniciar antes de 08:00 ou após as 19:30", 400);
      case end < 510:
      case end > 1200:
        throw new HttpException("Evento não pode finalizar antes de 08:30 ou após as 20:00", 400);
      default:
        break;
    }

    await event.update({
      ...data,
      image: image && image.filename
    });
  }

  async inactiveData(id: number) {
    const event = await this.getById(id);

    await event.destroy();
  }

  async getInactives() {
    return await this.eventModel.scope("inactives").findAll();
  }

  async getInactiveById(id: number) {
    const event = await this.eventModel.scope("inactives").findByPk(id);

    if (!event) throw new HttpException("Evento não encontardo", 404);

    return event;
  }

  async reactiveData(id: number) {
    const event = await this.getInactiveById(id);

    await event.restore();
  }

  async delete(id: number) {
    const event = await this.eventModel.scope("all").findByPk(id);

    if (!event) throw new HttpException("Evento não encontrado", 404);

    await event.destroy({ force: true });
  }
}