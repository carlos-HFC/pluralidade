import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isAfter, isValid, setMonth, setYear, startOfToday } from 'date-fns';
import { Sequelize } from 'sequelize-typescript';

import { CreateExperienceDTO, UpdateExperienceDTO } from './experience.dto';
import { Experience } from './experience.model';
import { UserService } from '../user/user.service';
import { trimObj } from '../utils';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience)
    private readonly experienceModel: typeof Experience,
    private sequelize: Sequelize,
    private userService: UserService
  ) { }

  async findById(id: number) {
    const experience = await this.experienceModel.findByPk(id);

    if (!experience) throw new HttpException("Experiência profissional não encontrada", 404);

    return experience;
  }

  async post(data: CreateExperienceDTO) {
    trimObj(data);

    const [initMonth, initYear] = data.initDate.split('/');

    const init = setYear(setMonth(startOfToday(), Number(initMonth) - 1), Number(initYear));

    switch (true) {
      case !isValid(init):
        throw new HttpException("Data de início inválida", 400);
      case isAfter(init, startOfToday()):
        throw new HttpException("Data de início não pode ser após a data atual", 400);
      default:
        break;
    }

    if (data.endDate) {
      const [endMonth, endYear] = data.endDate.split('/');

      const end = setYear(setMonth(startOfToday(), Number(endMonth) - 1), Number(endYear));
      switch (true) {
        case !isValid(end):
          throw new HttpException("Data de término inválida", 400);
        case isAfter(init, end):
          throw new HttpException("Data de início não pode ser após a data de término", 400);
        case isAfter(end, startOfToday()):
          throw new HttpException("Data de término não pode ser após a data atual", 400);
        default:
          break;
      }
    }

    await this.userService.findById(data.userId);

    const transaction = await this.sequelize.transaction();

    try {
      const experience = await this.experienceModel.create({ ...data }, { transaction });

      await transaction.commit();

      return experience;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async put(id: number, data: UpdateExperienceDTO) {
    trimObj(data);

    const experience = await this.findById(id);

    const [initMonth, initYear] = (data.initDate || experience.initDate).split('/');

    const init = setYear(setMonth(startOfToday(), Number(initMonth) - 1), Number(initYear));

    switch (true) {
      case !isValid(init):
        throw new HttpException('Data de início inválida', 400);
      case isAfter(init, startOfToday()):
        throw new HttpException('Data de início não pode ser após a data atual', 400);
      default:
        break;
    }

    if (data.endDate || experience.endDate) {
      const [endMonth, endYear] = (data?.endDate || experience?.endDate).split('/');

      const end = setYear(setMonth(startOfToday(), Number(endMonth) - 1), Number(endYear));

      switch (true) {
        case !isValid(end):
          throw new HttpException('Data de término inválida', 400);
        case isAfter(init, end):
          throw new HttpException('Data de início não pode ser após a data de término', 400);
        case isAfter(end, startOfToday()):
          throw new HttpException('Data de término não pode ser após a data atual', 400);
        default:
          break;
      }
    }

    const transaction = await this.sequelize.transaction();

    try {
      await experience.update({ ...data }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }
}