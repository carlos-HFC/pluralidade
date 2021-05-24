import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ICreateEvent, IUpdateEvent } from '.';
import { EventService } from './event.service';
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

  @Get('all')
  async all() {
    return await this.eventService.getAll();
  }

  @Get('inactives')
  async inactives() {
    return await this.eventService.getInactives();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.eventService.getById(id);
  }

  @Get('inactives/:id')
  async getInactiveById(@Param('id') id: number) {
    return await this.eventService.getInactiveById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(@Body() data: ICreateEvent, @UploadedFile() image: Express.Multer.File) {
    return await this.eventService.post(data, image);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async update(@Param('id') id: number, @Body() data: IUpdateEvent, @UploadedFile() image: Express.Multer.File) {
    return await this.eventService.put(id, data, image);
  }

  @Put('inactives/:id')
  async reactiveData(@Param('id') id: number) {
    return await this.eventService.reactiveData(id);
  }

  @HttpCode(204)
  @Delete(':id')
  async inactiveData(@Param('id') id: number) {
    return await this.eventService.inactiveData(id);
  }

  @HttpCode(204)
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.eventService.delete(id);
  }
}