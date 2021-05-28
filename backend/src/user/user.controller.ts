import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { ICreateUser, IUpdateUser } from '.';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import multerConfig from '../multer';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Get()
  async index() {
    return await this.userService.get();
  }

  @Get('all')
  async all() {
    return await this.userService.getAll();
  }

  @Get('inactives')
  async inactives() {
    return await this.userService.getInactives();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.userService.getById(id);
  }

  @Get('inactives/:id')
  async getInactiveById(@Param('id') id: number) {
    return await this.userService.getInactiveById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async create(@Body() data: ICreateUser, @UploadedFile() avatar: Express.Multer.File) {
    return await this.userService.post(data, avatar);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async update(@Req() req: Request, @Body() data: IUpdateUser, @UploadedFile() avatar: Express.Multer.File) {
    return await this.userService.put(req.user, data, avatar);
  }

  @Put('inactives/:id')
  async reactiveData(@Param('id') id: number) {
    return await this.userService.reactiveData(id);
  }

  @HttpCode(204)
  @Delete(':id')
  async inactiveData(@Param('id') id: number) {
    return await this.userService.inactiveData(id);
  }

  @HttpCode(204)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/course')
  async registerCourse(@Req() req: Request, @Body() data: { courseId: number; }) {
    return await this.userService.registerCourse(req.user, data.courseId);
  }
}