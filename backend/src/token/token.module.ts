import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TokenController } from './token.controller';
import { Token } from './token.model';
import { TokenService } from './token.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Token]),
    UserModule,
    forwardRef(()=> AuthModule)
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule { }