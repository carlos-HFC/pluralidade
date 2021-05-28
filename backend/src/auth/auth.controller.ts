import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ILogin, IResetPassword } from '.';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: ILogin) {
    return await this.authService.login(data);
  }

  @Post('forgot')
  @HttpCode(200)
  async forgot(@Body() data: ILogin) {
    return await this.authService.forgotPassword(data.email);
  }

  @Post('reset')
  @HttpCode(200)
  async reset(@Body() data: IResetPassword) {
    return await this.authService.resetPassword(data);
  }
}