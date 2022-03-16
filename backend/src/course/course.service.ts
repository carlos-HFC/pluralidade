import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addBusinessDays, addMonths, differenceInBusinessDays, endOfMonth, format, isAfter, isWeekend, parseISO, setMonth, startOfDay, startOfMonth, startOfToday, subBusinessDays } from 'date-fns';
import { Op as $ } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { CreateCourseDTO, FilterCourseDTO, UpdateCourseDTO } from './course.dto';
import { Course } from './course.model';
import { UploadService } from '../config/upload.service';
import { MailService } from '../mail/mail.service';
import { User } from '../user/user.model';
import { convertBool, trimObj } from '../utils';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
    private mailService: MailService,
    private sequelize: Sequelize,
    private upload: UploadService
  ) {}

  async get(query?: FilterCourseDTO) {
    trimObj(query);
    const where = {
      initDate: {
        [$.gte]: startOfToday()
      }
    };

    if (query.pcd) Object.assign(where, { pcd: convertBool(query.pcd) });
    if (query.name) Object.assign(where, { name: { [$.substring]: query.name } });
    if (query.period) Object.assign(where, { period: query.period.toUpperCase() });
    if (query.month) {
      const month = setMonth(startOfToday(), Number(query.month) - 1);

      if (isAfter(startOfToday(), month)) throw new HttpException("Você não pode filtrar por um mês que já passou", 400);

      Object.assign(where, {
        initDate: {
          [$.between]: [
            startOfMonth(month),
            endOfMonth(month),
          ]
        }
      });
    }

    return await this.courseModel.findAll({
      paranoid: !convertBool(query.inactives),
      where,
      order: [['initDate', 'ASC'], ['endDate', 'ASC']]
    });
  }

  async findById(id: number, inactives?: 'true' | 'false') {
    const course = await this.courseModel.findByPk(id, { paranoid: !convertBool(inactives) });

    if (!course) throw new HttpException("Curso não encontrado", 404);

    return course;
  }

  async availableDate(period: 'M' | 'T' | 'N', initDate: string, endDate: string) {
    return await this.courseModel.findAndCountAll({
      where: {
        period,
        initDate: { [$.lte]: initDate },
        endDate: { [$.gte]: endDate },
      }
    });
  }

  async post(data: CreateCourseDTO, media: Express.Multer.File) {
    trimObj(data);

    if (!media) throw new HttpException('A imagem é obrigatória', 400);

    const image = this.upload.post(media);
    Object.assign(data, { image });

    const date = parseISO(data.initDate);

    switch (true) {
      case differenceInBusinessDays(date, startOfToday()) < 5:
        throw new HttpException('Curso não pode iniciar em menos de 5 dias úteis', 400);
      case isAfter(startOfToday(), date):
        throw new HttpException('Data passada não permitida', 400);
      case isWeekend(date):
        throw new HttpException('Curso não pode iniciar em um fim de semana', 400);
      default:
        break;
    }

    const difference = differenceInBusinessDays(addMonths(date, data.months), date);
    const endDate = format(addBusinessDays(date, difference), 'yyyy-MM-dd');
    const checkAvailability = await this.availableDate(data.period, endDate, format(date, 'yyyy-MM-dd'));

    if (checkAvailability.count > 2) throw new HttpException('Data do curso indisponível', 400);

    const transaction = await this.sequelize.transaction();

    try {
      const course = await this.courseModel.create({
        ...data,
        endDate
      }, { transaction });

      await transaction.commit();

      return course;
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async put(id: number, data: UpdateCourseDTO, media?: Express.Multer.File) {
    trimObj(data);

    const course = await this.findById(id);

    const date = parseISO(data.initDate || String(course.initDate));

    if (media) {
      const image = this.upload.post(media);
      Object.assign(data, { image });
    }

    switch (true) {
      case differenceInBusinessDays(date, startOfToday()) < 5:
        throw new HttpException('Curso não pode iniciar em menos de 5 dias úteis', 400);
      case isAfter(startOfToday(), date):
        throw new HttpException('Data passada não permitida', 400);
      case isWeekend(date):
        throw new HttpException('Curso não pode iniciar em um fim de semana', 400);
      default:
        break;
    }

    if (data.months) {
      const difference = differenceInBusinessDays(addMonths(date, data.months), date);
      const endDate = format(addBusinessDays(date, difference), 'yyyy-MM-dd');
      Object.assign(data, { endDate });

      const checkAvailability = await this.availableDate((data.period || course.period), endDate, format(date, 'yyyy-MM-dd'));

      const filteredCourses = checkAvailability.rows.filter(row => row.id !== course.id);

      if (filteredCourses.length > 2) throw new HttpException('Data do curso indisponível', 400);
    }

    const transaction = await this.sequelize.transaction();

    try {
      await course.update({ ...data }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  async activeInactive(id: number, status: 'true' | 'false') {
    const st = convertBool(status);

    const course = await this.findById(id, 'true');

    if (!st) return await course.destroy();
    return await course.restore();
  }

  async registerCourse(user: User, id: number) {
    const course = await this.findById(id);

    const initDate = new Date(course.initDate);
    const limitDate = startOfDay(subBusinessDays(initDate, 5));

    switch (true) {
      case isAfter(startOfToday(), limitDate):
      case course.spots === 0:
        throw new HttpException('As inscrições para este curso acabaram', 400);
      case user.courseId === id:
        throw new HttpException('Você já está inscrito neste curso', 400);
      case course.pcd && !user.deficient:
        throw new HttpException('Este curso é destinado apenas para pessoas com deficiência', 400);
      default:
        break;
    }

    const spots = course.spots > 0 ? course.spots - 1 : course.spots;

    const transaction = await this.sequelize.transaction();

    try {
      await course.update({ spots }, { transaction });
      await user.update({ courseId: id }, { transaction });

      await transaction.commit();

      return await this.mailService.registerCourse(user, course);
    } catch (error) {
      await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }
}