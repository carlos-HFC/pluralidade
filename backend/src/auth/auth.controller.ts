import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ILogin } from '.';
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
}