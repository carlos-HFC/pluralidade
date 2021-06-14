import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { format } from 'date-fns';

import { CreateSolicitation } from '.';
import { Solicitation } from './solicitation.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { trimObj } from '../utils';

@Injectable()
export class SolicitationService {
  constructor(
    @InjectModel(Solicitation)
    private readonly solicitationModel: typeof Solicitation,
    private readonly userService: UserService
  ) { }

  async get() {
    return await this.solicitationModel.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        },
      ]
    });
  }

  async getById(id: number) {
    const solicitation = await this.solicitationModel.findByPk(id);

    if (!solicitation) throw new HttpException("Solicitação não encontrada", 404);

    return solicitation;
  }

  async getByUser(userId: number) {
    await this.userService.getById(userId);

    return await this.solicitationModel.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        },
      ]
    });
  }

  async post(user: User, data: CreateSolicitation) {
    const openedAt = format(new Date(), 'yyyy-MM-dd');

    trimObj(data);

    if (!data.description) throw new HttpException("Descrição é obrigatória", 400);

    const solicitation = await this.solicitationModel.create({
      ...data,
      openedAt,
      userId: 1
    });

    return solicitation;
  }

  async put(id: number) {
    const solicitation = await this.getById(id);

    const closedAt = format(new Date(), 'yyyy-MM-dd');

    await solicitation.update({
      done: true,
      closedAt
    });
  }
}