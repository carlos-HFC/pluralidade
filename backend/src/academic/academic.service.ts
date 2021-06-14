import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { isAfter, isEqual, isValid, parseISO } from 'date-fns';

import { CreateAcademic, UpdateAcademic } from '.';
import { Academic } from './academic.model';
import { trimObj } from '../utils';

@Injectable()
export class AcademicService {
  constructor(
    @InjectModel(Academic)
    private readonly academicModel: typeof Academic
  ) { }

  async getById(id: number) {
    const academic = await this.academicModel.findByPk(id);

    if (!academic) throw new HttpException("Formação acadêmica não encontrada", 404);

    return academic;
  }

  async post(data: CreateAcademic) {
    trimObj(data);

    const init = parseISO(data.initDate);
    const end = parseISO(data.endDate);

    data.finished = Boolean(data.endDate);

    switch (true) {
      case !isValid(init):
      case data.finished && !isValid(end):
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

    const academic = await this.academicModel.create(data);

    return academic;
  }

  async put(id: number, data: UpdateAcademic) {
    const academic = await this.getById(id);

    if (academic.endDate) throw new HttpException("Você não pode editar", 400);

    trimObj(data);

    const end = parseISO(data.endDate);

    switch (true) {
      case !isValid(end):
        throw new HttpException("Data inválida", 400);
      case isAfter(parseISO(academic.initDate), end):
      case isEqual(parseISO(academic.initDate), end):
        throw new HttpException("Data de conclusão não pode ser antes ou igual a data de início", 400);
      case isAfter(end, new Date()):
        throw new HttpException("Data de conclusão não pode ser após a data atual", 400);
      default:
        break;
    }

    await academic.update({ ...data });
  }
}