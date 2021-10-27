import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { addHours, isAfter } from 'date-fns';
import { Sequelize } from 'sequelize-typescript';

import { ForgotPasswordDTO, LoginDTO, ResetPasswordDTO } from './auth.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { createTokenHEX, trimObj } from '../utils';
import { CreateUserDTO } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private sequelize: Sequelize
  ) { }

  async login(data: LoginDTO) {
    trimObj(data);

    const user = await this.userService.findByEmail(data.email);

    if (!user || !(await user.checkPass(data.password))) throw new HttpException("As credenciais estão incorretas", 400);

    return this.createToken(user);
  }

  async validate({ email }: LoginDTO) {
    return await this.userService.findByEmail(email);
  }

  async register(data: CreateUserDTO) {
    return await this.userService.post(data, true)
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
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async resetPassword(data: ResetPasswordDTO) {
    trimObj(data);

    const user = await this.userService.findByEmail(data.email);

    if (!user) throw new HttpException("Usuário não encontado", 404);

    switch (true) {
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
        tokenResetPasswordExpires: null
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  private createToken(user: User) {
    const { id, name, avatar, email, gender, cep, cpf, birthday, phone, complement, district, city, uf, role } = user;

    const token = this.jwtService.sign({ id, email, role: role.name, cpf, password: user.hash });

    const [address, number] = user.address.split(',').map(address => address.trim());

    return {
      token,
      user: {
        id,
        name,
        avatar,
        email,
        cpf,
        birthday,
        gender,
        cep,
        address,
        number,
        complement,
        district,
        city,
        uf,
        phone,
        role: role.name
      }
    };
  }
}