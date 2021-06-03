import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { differenceInCalendarYears, isAfter, isValid, parseISO } from 'date-fns';

import { ICreateUser, IUpdateUser } from '.';
import { User } from './user.model';
import { CourseService } from '../course/course.service';
import { MailService } from '../mail/mail.service';
import { RoleService } from '../role/role.service';
import { trimObj, validateCEP, validateCPF, validateEmail } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly courseService: CourseService,
    private readonly mailService: MailService,
    private readonly roleService: RoleService,
  ) { }

  async get() {
    return await this.userModel.findAll({
      attributes: { exclude: ['hash'] }
    });
  }

  async getAll() {
    return await this.userModel.scope("all").findAll({
      attributes: { exclude: ['hash'] }
    });
  }

  async getInactives() {
    return await this.userModel.scope("inactives").findAll({
      attributes: { exclude: ['hash'] }
    });
  }

  // async getAlunos(id?: number) {
  //   if (id) return await this.userModel.scope('aluno').findByPk(id);

  //   return await this.userModel.scope('aluno').findAll();
  // }

  // async getAdmins(id?: number) {
  //   if (id) return await this.userModel.scope('admin').findByPk(id);

  //   return await this.userModel.scope('admin').findAll();
  // }

  async getById(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    return user;
  }

  async getByCPF(cpf: string) {
    validateCPF(cpf);
    return await this.userModel.findOne({ where: { cpf } });
  }

  async getByEmail(email: string) {
    validateEmail(email);
    return await this.userModel.findOne({ where: { email } });
  }

  async getInactiveById(id: number) {
    const user = await this.userModel.scope("inactives").findByPk(id);

    if (!user) throw new HttpException("Usuário não encontrado", 404);

    return user;
  }

  async post(data: ICreateUser, avatar: Express.Multer.File) {
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
      avatar: avatar && avatar.filename
    });

    await this.mailService.storeUser(user);

    return user;
  }

  async put(user: User, data: IUpdateUser, avatar?: Express.Multer.File) {
    trimObj(data);

    if (data.cep) validateCEP(data.cep);

    if (data.deficient) Boolean(data.deficient);

    switch (true) {
      case data.birthday && !isValid(parseISO(data.birthday)):
      case data.birthday && differenceInCalendarYears(Date.now(), parseISO(data.birthday)) < 16:
      case data.birthday && differenceInCalendarYears(Date.now(), parseISO(data.birthday)) > 30:
        throw new HttpException("Data de nascimento inválida", 400);
      case data.deficient && !data.whichDeficiency:
        throw new HttpException("Digite a(s) deficiência(s) portadora(s)", 400);
      case data.phone && data.phone.length < 10:
      case data.phone && data.phone.length > 11:
        throw new HttpException("Número de telefone inválido", 400);
      default:
        break;
    }

    if (data.cpf && data.cpf !== user.cpf) {
      validateCPF(data.cpf);
      if (await this.getByCPF(data.cpf)) throw new HttpException("Esse usuário já existe", 400);
    }

    if (data.email && data.email !== user.email) {
      validateEmail(data.email);
      if (await this.getByEmail(data.email)) throw new HttpException("Esse usuário já existe", 400);
    }

    if (data.oldPassword) {
      const { oldPassword, password, confirmPassword } = data;

      switch (true) {
        case !(await user.checkPass(oldPassword)):
          throw new HttpException("Senha atual incorreta", 400);
        case oldPassword && !password:
          throw new HttpException("Nova senha é obrigatória", 400);
        case oldPassword === password:
          throw new HttpException("Nova senha não pode ser igual a senha atual", 400);
        case password.length < 6:
          throw new HttpException("Senha muito curta", 400);
        case password && !confirmPassword:
          throw new HttpException("Confirmação de senha é obrigatória", 400);
        case password !== confirmPassword:
          throw new HttpException("As senhas não correspondem", 400);
        default:
          break;
      }
    }

    await user.update({
      ...data,
      avatar: avatar && avatar.filename
    });
  }

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

  async registerCourse(user: User, courseId: number) {
    const aluno = await this.userModel.scope('aluno').findByPk(user.id);

    if (!aluno) throw new HttpException("Você não é um aluno", 400);

    const course = await this.courseService.getById(courseId);

    if (isAfter(new Date(), parseISO(course.limitDate))) await this.courseService.put(course.id, { closed: true });

    switch (true) {
      case aluno.courseId === courseId:
        throw new HttpException("Você já está inscrito neste curso", 400);
      case course.closed === true:
        throw new HttpException("A inscrição neste curso está interrompida no momento", 400);
      default:
        break;
    }

    const spots = course.spots > 0 ? course.spots - 1 : course.spots;

    await this.courseService.put(course.id, { spots });

    await this.put(user, { courseId });
  }
}