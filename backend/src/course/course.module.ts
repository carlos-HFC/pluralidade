import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CourseController } from './course.controller';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Course])
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService]
})

export class CourseModule { }