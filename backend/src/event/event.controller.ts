import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateEventDTO, FilterEventDTO, UpdateEventDTO } from './event.dto';
import { EventService } from './event.service';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { config } from '../config/multer';

@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService
  ) { }

  @Get()
  async index(@Query() query?: FilterEventDTO) {
    return await this.eventService.get(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Get('/available')
  async available(@Query() { date }: FilterEventDTO) {
    return await this.eventService.available(date);
  }

  @Get(':id')
  async getById(@Param('id') id: number, @Query('inactives') inactives?: 'true' | 'false') {
    return await this.eventService.findById(id, inactives);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Post()
  @UseInterceptors(FileInterceptor('media', config))
  async create(@Body() data: CreateEventDTO, @UploadedFile() media: Express.Multer.File) {
    return await this.eventService.post(data, media);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Put(':id')
  @UseInterceptors(FileInterceptor('media', config))
  async update(@Param('id') id: number, @Body() data: UpdateEventDTO, @UploadedFile() media?: Express.Multer.File) {
    return await this.eventService.put(id, data, media);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number, @Query('status') status: 'true' | 'false') {
    return await this.eventService.activeInactive(id, status);
  }
}