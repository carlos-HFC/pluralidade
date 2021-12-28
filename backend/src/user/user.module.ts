import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';

import { UserController } from './user.controller';
import { User } from './user.model';
import { SeedUser } from './user.seed';
import { UserService } from './user.service';
import { UploadService } from '../config/upload.service';
import { CourseModule } from '../course/course.module';
import { MailModule } from '../mail/mail.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    SeederModule.forFeature([SeedUser]),
    SequelizeModule.forFeature([User]),
    RoleModule,
    MailModule,
    // CourseModule
  ],
  controllers: [UserController],
  providers: [UserService, UploadService],
  exports: [UserService],
})
export class UserModule { }