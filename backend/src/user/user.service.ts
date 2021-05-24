import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { differenceInCalendarYears, isValid, parseISO } from 'date-fns';

import { ICreateUser } from '.';
import { User } from './user.model';
import { RoleService } from '../role/role.service';
import { trimObj, validateCEP, validateCPF, validateEmail } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly roleService: RoleService
  ) { }

  async get() {
    return await this.userModel.findAll();
  }

  async getAll() {
    return await this.userModel.scope("all").findAll();
  }

  async getInactives() {
    return await this.userModel.scope("inactives").findAll();
  }

  async getById(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    return user;
  }

  async getByCPF(cpf: string) {
    validateCPF(cpf);

    const user = await this.userModel.findOne({ where: { cpf } });

    return user;
  }

  async getByEmail(email: string) {
    validateEmail(email);

    const user = await this.userModel.findOne({ where: { email } });

    return user;
  }

  async getInactiveById(id: number) {
    const user = await this.userModel.scope("inactives").findByPk(id);

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    return user;
  }

  async post(data: ICreateUser, avatar?: Express.Multer.File) {
    trimObj(data);
    validateEmail(data.email);
    validateCPF(data.cpf);
    validateCEP(data.cep);

    await this.roleService.getById(data.roleId);
    if (await this.getByEmail(data.email) || await this.getByCPF(data.cpf)) throw new HttpException("Usuário já existe", 400);

    data.deficient = Boolean(data.deficient);

    const birth = parseISO(data.birthday);

    switch (true) {
      case data.password.length < 6:
        throw new HttpException("Senha muito curta", 400);
      case data.password !== data.confirmPassword:
        throw new HttpException("Senhas não correspondem", 400);
      case !isValid(birth):
        throw new HttpException("Data de nascimento inválida", 400);
      case differenceInCalendarYears(Date.now(), birth) < 16:
      case differenceInCalendarYears(Date.now(), birth) > 30:
        throw new HttpException("Você não tem idade suficiente para cadastrar-se", 400);
      case data.deficient && !data.whichDeficiency:
        throw new HttpException("Digite a(s) deficiência(s) portadora(s)", 400);
      case data.phone.length < 10:
      case data.phone.length > 11:
        throw new HttpException("Número de telefone inválido", 400);
      default:
        break;
    }

    const user = await this.userModel.create({
      ...data,
      avatar: avatar?.filename || ''
    });

    return user;
  }

  async put() { }

  async inactiveData(id: number) {
    const user = await this.getById(id);

    await user.destroy();
  }

  async reactiveData(id: number) {
    const user = await this.getInactiveById(id);

    await user.restore();
  }

  async delete(id: number) {
    const user = await this.userModel.scope("all").findByPk(id);

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    await user.destroy({ force: true });
  }
}