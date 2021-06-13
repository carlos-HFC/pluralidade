import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isAfter, isEqual, isValid, parseISO } from 'date-fns';

import { CreateAcademic } from '.';
import { Academic } from './academic.model';
import { UserService } from '../user/user.service';
import { trimObj } from '../utils';

@Injectable()
export class AcademicService {
  constructor(
    @InjectModel(Academic)
    private readonly academicModel: typeof Academic,
    private readonly userService: UserService
  ) { }

  async post(data: CreateAcademic) {
    trimObj(data);

    await this.userService.getAlunoById(data.userId);

    const init = parseISO(data.initDate);
    const end = parseISO(data.endDate);

    data.finished = Boolean(data.endDate);

    switch (true) {
      case !isValid(init):
      case !isValid(end):
        throw new HttpException("Data inválida", 400);
      case isAfter(init, new Date()):
        throw new HttpException("Data de início não pode ser após a data atual", 400);
      case isEqual(init, end):
      case isAfter(init, end):
        throw new HttpException("Data de início não pode ser igual ou após a data de conclusão", 400);
      case isAfter(end, new Date()):
        throw new HttpException("Data de conclusão não pode ser após a data atual", 400);
      default:
        break;
    }

    const xp = await this.academicModel.create(data);

    return xp;
  }
}