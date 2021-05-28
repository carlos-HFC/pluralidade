import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { isAfter } from 'date-fns';

import { ILogin, IResetPassword } from '.';
import { MailService } from '../mail/mail.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { trimObj, validateEmail } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
  ) { }

  async login(data: ILogin) {
    trimObj(data);
    validateEmail(data.email);

    const { email, password } = data;

    const user = await this.userService.getByEmail(email);

    if (!user || !(await user.checkPass(password))) throw new HttpException("As credenciais estão incorretas", 400);

    const token = this.createToken(user);

    return {
      user: {
        name: user.name,
        email,
        role: user.role.type,
      },
      token
    };
  }

  async validate(paylod: { email: string; }) {
    return await this.userService.getByEmail(paylod.email);
  }

  async register() { }

  async forgotPassword(email: string) {
    const user = await this.userService.getByEmail(email.trim());

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    const token = randomBytes(20).toString('hex');

    const now = new Date().setHours(new Date().getHours() + 1);

    // console.log(typeof now.toString());

    // return { token, now, nowStr: now.toString() };

    await user.update({
      resetPasswordToken: token,
      resetPasswordExpires: now.toString()
    });

    await this.mailService.forgotPass(user, token);
  }

  async resetPassword(data: IResetPassword) {
    trimObj(data);

    const user = await this.userService.getByEmail(data.email);
    const now = new Date();

    switch (true) {
      case !user:
        throw new HttpException("Usuário não encontado", 404);
      case data.token !== user.resetPasswordToken:
        throw new HttpException("Token inválido", 400);
      case isAfter(now, Number(user.resetPasswordExpires)):
        throw new HttpException("Token expirou", 400);
      case data.password.length < 6:
        throw new HttpException("Senha muito curta", 400);
      case data.password && !data.confirmPassword:
        throw new HttpException("Confirmação de senha é obrigatória", 400);
      case data.password !== data.confirmPassword:
        throw new HttpException("As senhas não correspondem", 400);
      default:
        break;
    }

    await user.update({
      ...data,
      resetPasswordToken: null,
      resetPasswordExpires: null
    })
  }

  private createToken(user: User) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}