import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addHours } from 'date-fns';
import { Sequelize } from 'sequelize-typescript';

import { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from './user.dto';
import { User } from './user.model';
import { UploadService } from '../config/upload.service';
import { MailService } from '../mail/mail.service';
import { RoleService } from '../role/role.service';
import { capitalizeFirstLetter, convertBool, createTokenHEX, trimObj, validateCPF } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private mailService: MailService,
    private roleService: RoleService,
    private sequelize: Sequelize,
    private uploadService: UploadService
  ) { }

  async get(query?: FilterUserDTO) {
    trimObj(query);
    const where = {};

    if (query.role) Object.assign(where, { role: { name: capitalizeFirstLetter(query.role) } });

    return await this.userModel.scope('role').findAll({
      paranoid: !convertBool(query.inactives),
      attributes: ['id', 'name', 'email', 'avatar', 'cpf', 'deletedAt'],
      where
    });
  }

  async findById(id: number, inactives?: 'true' | 'false') {
    const user = await this.userModel.scope('role').findByPk(id, {
      paranoid: !convertBool(inactives),
      attributes: {
        exclude: ['hash', 'emailVerified', 'tokenEmailVerification', 'tokenEmailVerificationExpires', 'tokenResetPassword', 'tokenResetPasswordExpires']
      }
    });

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    return user;
  }

  async findByCPF(cpf: string) {
    validateCPF(cpf);
    return await this.userModel.findOne({
      where: {
        cpf: cpf.replace(/[\s-.]/g, '').trim()
      },
      attributes: ['cpf']
    });
  }

  async findByEmail(email: string) {
    return await this.userModel.scope('role').findOne({
      where: {
        email: email.trim().toLowerCase()
      },
    });
  }

  async post(data: CreateUserDTO, isAdmin?: boolean) {
    trimObj(data);

    const { id: roleId } = await this.roleService.findByName(isAdmin ? 'Admin' : 'Aluno');

    if (await this.findByEmail(data.email) || await this.findByCPF(data.cpf)) throw new HttpException("Usuário já cadastrado", 400);

    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.userModel.create({
        ...data,
        roleId,
        password: createTokenHEX(5),
        tokenEmailVerification: createTokenHEX(),
        tokenEmailVerificationExpires: addHours(new Date(), 1),
        emailVerified: false
      }, { transaction });

      await transaction.commit();

      await this.mailService.newUser(user);

      return user;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async put(user: User, data: UpdateUserDTO, media?: Express.Multer.File) {
    trimObj(data);

    if (media) {
      const avatar = this.uploadService.post(media);
      Object.assign(data, { avatar });
    }

    if (data.cpf && data.cpf !== user.cpf) {
      if (await this.findByCPF(data.cpf)) throw new HttpException("Usuário já cadastrado", 400);
    }

    if (data.email && data.email !== user.email) {
      if (await this.findByEmail(data.email)) throw new HttpException("Usuário já cadastrado", 400);

      Object.assign(data, {
        emailVerified: false,
        tokenEmailVerification: createTokenHEX(),
        tokenEmailVerificationExpires: addHours(new Date(), 1)
      });

      await this.mailService.updateEmail(user, true);
    }

    if (data.oldPassword) {
      const { oldPassword, password } = data;

      switch (true) {
        case !(await user.checkPass(oldPassword)):
          throw new HttpException("Senha atual incorreta", 400);
        case oldPassword === password:
          throw new HttpException("Nova senha não pode ser igual a senha atual", 400);
        default:
          break;
      }
    }

    const transaction = await this.sequelize.transaction();

    try {
      await user.update({ ...data }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async activeInactive(id: number, status: 'true' | 'false') {
    const st = convertBool(status);

    const user = await this.findById(id, 'true');

    if (!st) return await user.destroy();
    return await user.restore();
  }
}