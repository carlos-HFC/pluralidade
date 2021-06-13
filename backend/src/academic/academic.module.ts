import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AcademicController } from './academic.controller';
import { Academic } from './academic.model';
import { AcademicService } from './academic.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Academic]),
    UserModule
  ],
  controllers: [AcademicController],
  providers: [AcademicService],
  exports: [AcademicService],
})
export class AcademicModule { }