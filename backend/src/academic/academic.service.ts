import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getYear, isAfter } from 'date-fns';
import { Sequelize } from 'sequelize-typescript';

import { CreateAcademicDTO, UpdateAcademicDTO } from './academic.dto';
import { Academic } from './academic.model';
import { UserService } from '../user/user.service';
import { trimObj } from '../utils';

@Injectable()
export class AcademicService {
  constructor(
    @InjectModel(Academic)
    private readonly academicModel: typeof Academic,
    private sequelize: Sequelize,
    private userService: UserService
  ) { }

  async findById(id: number) {
    const academic = await this.academicModel.findByPk(id);

    if (!academic) throw new HttpException('Formação acadêmica não encontrada', 404);

    return academic;
  }

  async post(data: CreateAcademicDTO) {
    trimObj(data);

    const init = Number(data.initDate);
    const year = getYear(new Date());

    if (isAfter(init, year)) throw new HttpException('Data de início não pode ser após a data atual', 400);

    if (data.endDate) {
      const end = Number(data.endDate);

      switch (true) {
        case isAfter(init, end):
          throw new HttpException('Data de início não pode ser após a data de conclusão', 400);
        case isAfter(end, year):
          throw new HttpException('Data de conclusão não pode ser após a data atual', 400);
        default:
          break;
      }
    }

    await this.userService.findById(data.userId);

    const transaction = await this.sequelize.transaction();

    try {
      const academic = await this.academicModel.create({ ...data }, { transaction });

      await transaction.commit();

      return academic;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async put(id: number, data: UpdateAcademicDTO) {
    trimObj(data);

    const academic = await this.findById(id);

    const init = Number(data.initDate || academic.initDate);
    const end = Number(data.endDate || academic.endDate);
    const year = getYear(new Date())

    switch (true) {
      case isAfter(init, year):
        throw new HttpException('Data de início não pode ser após a data atual', 400);
      case isAfter(init, end):
        throw new HttpException('Data de início não pode ser após a data de conclusão', 400);
      case isAfter(end, year):
        throw new HttpException('Data de conclusão não pode ser após a data atual', 400);
      default:
        break;
    }

    const transaction = await this.sequelize.transaction();

    try {
      await academic.update({ ...data }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }
}