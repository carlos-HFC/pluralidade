import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ICreateCourse, IUpdateCourse } from '.';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Get('all')
  async all() {
    return await this.courseService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Get('inactives')
  async inactives() {
    return await this.courseService.getInactives();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.courseService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Get('inactives/:id')
  async getInactiveById(@Param('id') id: number) {
    return await this.courseService.getInactiveById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@Body() data: ICreateCourse, @UploadedFile() image: Express.Multer.File) {
    return await this.courseService.post(data, image);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async update(@Param('id') id: number, @Body() data: IUpdateCourse, @UploadedFile() image: Express.Multer.File) {
    return await this.courseService.put(id, data, image);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Put('inactives/:id')
  async reactiveData(@Param('id') id: number) {
    return await this.courseService.reactiveData(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @HttpCode(204)
  @Delete(':id')
  async inactiveData(@Param('id') id: number) {
    return await this.courseService.inactiveData(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @HttpCode(204)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.courseService.delete(id);
  }
}