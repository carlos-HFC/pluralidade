import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { addHours, isAfter } from 'date-fns';
import { Sequelize } from 'sequelize-typescript';

import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO, VerifyRegisterDTO } from './auth.dto';
import { MailService } from '../mail/mail.service';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/user.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { createTokenHEX, trimObj } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
    private tokenService: TokenService,
    private userService: UserService,
    private sequelize: Sequelize
  ) { }

  async login(data: LoginDTO) {
    trimObj(data);

    const user = await this.userService.findByEmail(data.email);

    switch (true) {
      case !user:
      case !(await user.checkPass(data.password)):
        throw new HttpException('As credenciais estão incorretas', 404);
      case !user.emailVerified:
        throw new HttpException('E-mail não verificado', 404);
      default:
        break;
    }

    return this.createToken(user);
  }

  async validate({ email }: LoginDTO) {
    return await this.userService.findByEmail(email);
  }

  async register(data: CreateUserDTO) {
    return await this.userService.post(data, true);
  }

  async verifyRegister(data: VerifyRegisterDTO) {
    trimObj(data);

    const user = await this.userService.findByEmail(data.email);

    switch (true) {
      case !user:
        throw new HttpException('Verifique se o e-mail inserido está correto', 400);
      case user.emailVerified:
        throw new HttpException('E-mail já verificado', 400);
      case data.token !== user.tokenEmailVerification:
        throw new HttpException('O token está inválido', 400);
      default:
        break;
    }

    if (isAfter(new Date(), user.tokenEmailVerificationExpires)) {
      const token = createTokenHEX(), now = addHours(new Date(), 1);

      await this.userService.put(user, {
        tokenEmailVerification: token,
        tokenEmailVerificationExpires: now,
        emailVerified: false
      });

      await this.mailService.updateEmail(user);

      throw new HttpException('O seu token expirou, mas te enviamos um novo token', 400);
    }

    try {
      await this.userService.put(user, {
        tokenEmailVerification: null,
        tokenEmailVerificationExpires: null,
        emailVerified: true
      });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }

  async forgotPassword({ email }: ForgotPasswordDTO) {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    const token = createTokenHEX(), now = addHours(new Date(), 1);

    const transaction = await this.sequelize.transaction();

    try {
      await user.update({
        tokenResetPassword: token,
        tokenResetPasswordExpires: now,
      }, { transaction });

      await transaction.commit();

      await this.mailService.forgotPassword(user);
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async resetPassword(data: ResetPasswordDTO) {
    trimObj(data);

    const user = await this.userService.findByEmail(data.email);

    switch (true) {
      case !user:
        throw new HttpException("Verifique se o e-mail inserido está correto", 400);
      case data.token !== user.tokenResetPassword:
        throw new HttpException("Token inválido", 400);
      case isAfter(new Date(), user.tokenResetPasswordExpires):
        throw new HttpException("Token expirou", 400);
      case await user.checkPass(data.password):
        throw new HttpException("Nova senha não pode ser igual a senha atual", 400);
      default:
        break;
    }

    const transaction = await this.sequelize.transaction();

    try {
      await user.update({
        tokenResetPassword: null,
        tokenResetPasswordExpires: null,
        password: data.password
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async createToken(user: User) {
    const { id, name, avatar, email, cpf, role } = user;

    const token = this.jwtService.sign({ id, email, role: role.name, cpf, password: user.hash });

    await this.tokenService.post({ token, userId: id });

    return {
      token,
      user: {
        id,
        name,
        avatar,
        email,
        role: role.name
      }
    };
  }
}