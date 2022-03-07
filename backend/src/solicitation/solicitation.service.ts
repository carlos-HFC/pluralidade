import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { CreateSolicitationDTO } from './solicitation.dto';
import { Solicitation } from './solicitation.model';
import { MailService } from '../mail/mail.service';
import { trimObj } from '../utils';

@Injectable()
export class SolicitationService {
  constructor(
    @InjectModel(Solicitation)
    private readonly solicitationModel: typeof Solicitation,
    private mailService: MailService,
    private sequelize: Sequelize,
  ) { }

  async get() {
    return await this.solicitationModel.findAll();
  }

  async findById(id: number) {
    const solicitation = await this.solicitationModel.findByPk(id);

    if (!solicitation) throw new HttpException("Solicitação não encontrada", 404);

    return solicitation;
  }

  async readSolicitation(id: number) {
    const solicitation = await this.findById(id);

    await solicitation.update({ read: true });
  }

  async post(data: CreateSolicitationDTO) {
    trimObj(data);

    const transaction = await this.sequelize.transaction();

    try {
      const solicitation = await this.solicitationModel.create({ ...data }, { transaction });

      await transaction.commit();

      await this.mailService.sendSolicitation(solicitation);

      return solicitation;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }
}