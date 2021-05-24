import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ICreateCourse, IUpdateCourse } from '.';
import { CourseService } from './course.service';
import multerConfig from '../multer';

@Controller('courses')
export class CourseController {
  constructor(
    private courseService: CourseService
  ) { }

  @Get()
  async index() {
    return await this.courseService.get();
  }

  @Get('all')
  async all() {
    return await this.courseService.getAll();
  }

  @Get('inactives')
  async inactives() {
    return await this.courseService.getInactives();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.courseService.getById(id);
  }

  @Get('inactives/:id')
  async getInactiveById(@Param('id') id: number) {
    return await this.courseService.getInactiveById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@Body() data: ICreateCourse, @UploadedFile() image: Express.Multer.File) {
    return await this.courseService.post(data, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async update(@Param('id') id: number, @Body() data: IUpdateCourse, @UploadedFile() image: Express.Multer.File) {
    return await this.courseService.put(id, data, image);
  }

  @Put('inactives/:id')
  async reactiveData(@Param('id') id: number) {
    return await this.courseService.reactiveData(id);
  }

  @HttpCode(204)
  @Delete(':id')
  async inactiveData(@Param('id') id: number) {
    return await this.courseService.inactiveData(id);
  }

  @HttpCode(204)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.courseService.delete(id);
  }
}