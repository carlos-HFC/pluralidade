import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { EventController } from './event.controller';
import { Event } from './event.model';
import { EventService } from './event.service';
import { UploadService } from '../config/upload.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Event])
  ],
  controllers: [EventController],
  providers: [EventService, UploadService],
  exports: [EventService]
})

export class EventModule { }