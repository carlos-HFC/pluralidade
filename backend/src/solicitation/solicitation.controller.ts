import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateSolicitation } from '.';
import { SolicitationService } from './solicitation.service';

@Controller('solicitations')
export class SolicitationController {
  constructor(
    private solicitationService: SolicitationService
  ) { }

  @Get()
  async index() {
    return await this.solicitationService.get();
  }

  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.solicitationService.getById(id);
  }

  @Get('user/:id')
  async byUserId(@Param('id') id: number) {
    return await this.solicitationService.getByUser(id);
  }

  @Post()
  async create(@Body() data: CreateSolicitation, @Req() req: Request) {
    return await this.solicitationService.post(req.user, data);
  }

  @Put(':id')
  async update(@Param('id') id: number) {
    return await this.solicitationService.put(id);
  }
}