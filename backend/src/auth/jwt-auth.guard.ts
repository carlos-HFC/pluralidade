import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, token, info) {
    if (!token) throw new HttpException("Você não tem acesso", 422);
    return token;
  }
}