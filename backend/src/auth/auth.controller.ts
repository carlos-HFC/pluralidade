import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDTO) {
    return await this.authService.login(data);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() data: CreateUserDTO) {
    return await this.authService.register(data);
  }

  @Post('forgot')
  @HttpCode(200)
  async forgot(@Body() data: ForgotPasswordDTO) {
    return await this.authService.forgotPassword(data);
  }

  @Post('reset')
  @HttpCode(200)
  async reset(@Body() data: ResetPasswordDTO) {
    return await this.authService.resetPassword(data);
  }
}