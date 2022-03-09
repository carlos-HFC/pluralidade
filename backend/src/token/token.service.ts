import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { CreateTokenDTO, RefreshTokenDTO } from './token.dto';
import { Token } from './token.model';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token)
    private readonly tokenModel: typeof Token,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private userService: UserService,
    private sequelize: Sequelize
  ) { }

  async findByUserId(userId: number) {
    return await this.tokenModel.findOne({ where: { userId } });
  }

  async findByToken(token: string) {
    return await this.tokenModel.findOne({ where: { token } });
  }

  async post(data: CreateTokenDTO) {
    const token = await this.findByUserId(data.userId);

    if (token) return await this.tokenModel.update(
      { token: data.token },
      { where: { userId: data.userId } }
    );

    const transaction = await this.sequelize.transaction();

    try {
      await this.tokenModel.create({ ...data }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async refreshToken(data: RefreshTokenDTO) {
    const token = await this.findByToken(data.oldToken);

    if (!token) throw new HttpException('Token inválido', 400);

    const user = await this.userService.findById(token.userId);

    return await this.authService.createToken(user);
  }
}