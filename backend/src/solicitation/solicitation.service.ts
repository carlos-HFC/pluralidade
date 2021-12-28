import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { getTime } from 'date-fns';
import { Sequelize } from 'sequelize-typescript';

import { CreateSolicitationDTO } from './solicitation.dto';
import { Solicitation } from './solicitation.model';
import { MailService } from '../mail/mail.service';
import { User } from '../user/user.model';
import { convertBool, trimObj } from '../utils';

@Injectable()
export class SolicitationService {
  constructor(
    @InjectModel(Solicitation)
    private readonly solicitationModel: typeof Solicitation,
    private mailService: MailService,
    private sequelize: Sequelize,
  ) { }

  async get(includeUsers?: 'true' | 'false') {
    const include = convertBool(includeUsers);

    return await this.solicitationModel.scope(include && 'user').findAll();
  }

  async findById(id: number) {
    const solicitation = await this.solicitationModel.findByPk(id);

    if (!solicitation) throw new HttpException("Solicitação não encontrada", 404);

    return solicitation;
  }

  async post(user: User, data: CreateSolicitationDTO) {
    trimObj(data);

    const protocol = getTime(new Date());

    const transaction = await this.sequelize.transaction();

    try {
      const solicitation = await this.solicitationModel.create({
        ...data,
        userId: user.id,
        protocol
      }, { transaction });

      await transaction.commit();

      // await this.mailService.storeSolicitation(user, protocol);

      return solicitation;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }
}