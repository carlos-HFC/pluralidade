import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isAfter, isValid, parseISO } from 'date-fns';

import { CreateExperience, UpdateExperience } from '.';
import { Experience } from './experience.model';
import { trimObj } from '../utils';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience)
    private readonly xpModel: typeof Experience
  ) { }

  async getById(id: number) {
    const xp = await this.xpModel.findByPk(id);

    if (!xp) throw new HttpException("Experiência profissional não encontrada", 404);

    return xp;
  }

  async post(data: CreateExperience) {
    trimObj(data);

    const init = parseISO(data.initDate);
    const end = parseISO(data.endDate);

    data.current = Boolean(data.endDate);

    switch (true) {
      case !isValid(init):
      case data.current && !isValid(end):
        throw new HttpException("Data inválida", 400);
      case isAfter(init, new Date()):
        throw new HttpException("Data de início não pode ser após a data atual", 400);
      case isAfter(init, end):
        throw new HttpException("Data de início não pode ser após a data final", 400);
      case isAfter(end, new Date()):
        throw new HttpException("Data final não pode ser após a data atual", 400);
      default:
        break;
    }

    const xp = await this.xpModel.create(data);

    return xp;
  }

  async put(id: number, data: UpdateExperience) {
    const xp = await this.getById(id);

    if (xp.endDate) throw new HttpException("Você não pode editar", 400);

    trimObj(data);

    if (data.endDate) {
      const end = parseISO(data.endDate);

      switch (true) {
        case !isValid(end):
          throw new HttpException("Data inválida", 400);
        case isAfter(parseISO(xp.initDate), end):
          throw new HttpException("Data final não pode ser antes que a data inicial", 400);
        case isAfter(end, new Date()):
          throw new HttpException("Data final não pode ser após a data atual", 400);
        default:
          break;
      }
    }

    await xp.update({ ...data });
  }
}