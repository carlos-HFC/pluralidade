import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CourseController } from './course.controller';
import { Course } from './course.model';
import { CourseService } from './course.service';
import { UploadService } from '../config/upload.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Course]),
    UserModule
  ],
  controllers: [CourseController],
  providers: [CourseService, UploadService],
  exports: [CourseService]
})

export class CourseModule { }