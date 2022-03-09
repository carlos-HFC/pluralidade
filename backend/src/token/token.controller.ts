import { Body, Controller, Put } from '@nestjs/common';

import { RefreshTokenDTO } from './token.dto';
import { TokenService } from './token.service';

@Controller('tokens')
export class TokenController {
  constructor(
    private tokenService: TokenService
  ) { }

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDTO) {
    return await this.tokenService.refreshToken(data)
  }
}