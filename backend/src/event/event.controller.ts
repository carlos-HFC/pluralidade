import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ICreateEvent, IUpdateEvent } from '.';
import { EventService } from './event.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Role } from '../auth/role.decorator';
import multerConfig from '../multer';

@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService
  ) { }

  @Get()
  async index() {
    return await this.eventService.get();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Get('all')
  async all() {
    return await this.eventService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Get('inactives')
  async inactives() {
    return await this.eventService.getInactives();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.eventService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Get('inactives/:id')
  async getInactiveById(@Param('id') id: number) {
    return await this.eventService.getInactiveById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@Body() data: ICreateEvent, @UploadedFile() image: Express.Multer.File) {
    return await this.eventService.post(data, image);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async update(@Param('id') id: number, @Body() data: IUpdateEvent, @UploadedFile() image: Express.Multer.File) {
    return await this.eventService.put(id, data, image);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Put('inactives/:id')
  async reactiveData(@Param('id') id: number) {
    return await this.eventService.reactiveData(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @HttpCode(204)
  @Delete(':id')
  async inactiveData(@Param('id') id: number) {
    return await this.eventService.inactiveData(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @HttpCode(204)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.eventService.delete(id);
  }
}