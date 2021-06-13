import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isAfter, isEqual, isValid, parseISO } from 'date-fns';

import { CreateExperience } from '.';
import { Experience } from './experience.model';
import { UserService } from '../user/user.service';
import { trimObj } from '../utils';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience)
    private readonly xpModel: typeof Experience,
    private readonly userService: UserService
  ) { }

  async post(data: CreateExperience) {
    trimObj(data);

    await this.userService.getAlunoById(data.userId);

    const init = parseISO(data.initDate);
    const end = parseISO(data.endDate);

    data.current = Boolean(data.endDate);

    switch (true) {
      case !isValid(init):
      case !isValid(end):
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
}