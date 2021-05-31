import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { differenceInBusinessDays, isAfter, isEqual, isValid, parseISO } from 'date-fns';

import { ICreateCourse, IUpdateCourse } from '.';
import { Course } from './course.model';
import { emptyFields, trimObj } from '../utils';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course
  ) { }

  async get() {
    return await this.courseModel.findAll();
  }

  async getAll() {
    return await this.courseModel.scope("all").findAll();
  }

  async getById(id: number) {
    const course = await this.courseModel.findByPk(id);

    if (!course) throw new HttpException("Curso não encontrado", 404);

    return course;
  }

  async post(data: ICreateCourse, image: Express.Multer.File) {
    trimObj(data);

    const { initDate, endDate, pcd, spots } = data;

    data.pcd = Boolean(pcd);

    if (Object.values(data).some(item => typeof item === "string" && !item) || !image) throw new HttpException("Há campos vazios", 400);

    const init = parseISO(initDate);
    const end = parseISO(endDate);

    switch (true) {
      case !isValid(init):
      case !isValid(end):
        throw new HttpException("Data inválida", 400);
      case spots > 30:
      case spots < 10:
        throw new HttpException("Curso deve ter o mínimo de 10 vagas e o máximo de 30 vagas", 400);
      case isAfter(init, end):
      case isEqual(init, end):
        throw new HttpException("Data inicial do curso não pode ser igual ou após a data final do curso", 400);
      case differenceInBusinessDays(end, init) + 1 <= 24:
        throw new HttpException("Curso não tem o número mínimo de dias", 400);
      default:
        break;
    }

    const course = await this.courseModel.create({
      ...data,
      image: image.filename
    });

    return course;
  }

  async put(id: number, data: IUpdateCourse, image?: Express.Multer.File) {
    trimObj(data);

    const course = await this.getById(id);

    const { initDate, endDate, pcd, spots } = data;

    data.pcd = Boolean(pcd);

    if (emptyFields(data) || image && image === null) throw new HttpException("Há campos vazios", 400);

    const init = parseISO(initDate || course.initDate);
    const end = parseISO(endDate || course.endDate);

    switch (true) {
      case !isValid(init):
      case !isValid(end):
        throw new HttpException("Data inválida", 400);
      case spots > 30:
      case spots < 10:
        throw new HttpException("Curso deve ter o mínimo de 10 vagas e o máximo de 30 vagas", 400);
      case isAfter(init, end):
      case isEqual(init, end):
        throw new HttpException("Data inicial do curso não pode ser igual ou após a data final do curso", 400);
      case differenceInBusinessDays(end, init) + 1 <= 24:
        throw new HttpException("Curso não tem o número mínimo de dias", 400);
      default:
        break;
    }

    await course.update({
      ...data,
      image: image && image.filename
    });
  }

  async inactiveData(id: number) {
    const course = await this.getById(id);

    await course.destroy();
  }

  async getInactives() {
    return await this.courseModel.scope("inactives").findAll();
  }

  async getInactiveById(id: number) {
    const course = await this.courseModel.scope("inactives").findByPk(id);

    if (!course) throw new HttpException("Curso não encontrado", 404);

    return course;
  }

  async reactiveData(id: number) {
    const course = await this.getInactiveById(id);

    await course.restore();
  }

  async delete(id: number) {
    const course = await this.courseModel.scope("all").findByPk(id);

    if (!course) throw new HttpException("Curso não encontrado", 404);

    await course.destroy({ force: true });
  }
}