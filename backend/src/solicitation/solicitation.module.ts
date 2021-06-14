import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SolicitationController } from './solicitation.controller';
import { Solicitation } from './solicitation.model';
import { SolicitationService } from './solicitation.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Solicitation]),
    UserModule
  ],
  controllers: [SolicitationController],
  providers: [SolicitationService],
  exports: [SolicitationService],
})
export class SolicitationModule { }