import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { join, resolve } from 'path';
import { Dialect } from 'sequelize';

import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { EventModule } from './event/event.module';
import { MailModule } from './mail/mail.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true
    }),
    MulterModule.register({
      dest: resolve(__dirname, '..', 'uploads')
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadModels: true,
      synchronize: true
    }),
    SendGridModule.forRoot({
      apiKey: process.env.MAIL_KEY
    }),
    RoleModule,
    CourseModule,
    EventModule,
    UserModule,
    AuthModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }