import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SolicitationController } from './solicitation.controller';
import { Solicitation } from './solicitation.model';
import { SolicitationService } from './solicitation.service';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Solicitation]),
    UserModule,
    MailModule,
  ],
  controllers: [SolicitationController],
  providers: [SolicitationService],
  exports: [SolicitationService],
})
export class SolicitationModule { }