import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';

import { UserController } from './user.controller';
import { User } from './user.model';
import { SeedUser } from './user.seed';
import { UserService } from './user.service';
import { MailModule } from '../mail/mail.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    SeederModule.forFeature([SeedUser]),
    SequelizeModule.forFeature([User]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    RoleModule,
    MailModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }