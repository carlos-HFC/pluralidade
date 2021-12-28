import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { CreateCourseDTO, FilterCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseService } from './course.service';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { config } from '../config/multer';

@Controller('courses')
export class CourseController {
  constructor(
    private courseService: CourseService
  ) { }

  @Get()
  async index(@Query() query?: FilterCourseDTO) {
    return await this.courseService.get(query);
  }

  @Get(':id')
  async getById(@Param('id') id: number, @Query('inactives') inactives?: 'true' | 'false') {
    return await this.courseService.findById(id, inactives);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Post()
  @UseInterceptors(FileInterceptor('media', config))
  async create(@Body() data: CreateCourseDTO, @UploadedFile() media: Express.Multer.File) {
    return await this.courseService.post(data, media);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Put(':id')
  @UseInterceptors(FileInterceptor('media', config))
  async update(@Param('id') id: number, @Body() data: UpdateCourseDTO, @UploadedFile() media: Express.Multer.File) {
    return await this.courseService.put(id, data, media);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @HttpCode(204)
  @Delete(':id')
  async activeInactive(@Param('id') id: number, @Query('status') status: 'true' | 'false') {
    return await this.courseService.activeInactive(id, status);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('aluno')
  @Patch(':id')
  async registerCourse(@Param('id') id: number, @Req() req: Request) {
    return await this.courseService.registerCourse(req.user, id);
  }
}