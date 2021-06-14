import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/role.guard';

import { CreateSolicitation } from '.';
import { SolicitationService } from './solicitation.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('solicitations')
export class SolicitationController {
  constructor(
    private solicitationService: SolicitationService
  ) { }

  @Role('admin')
  @Get()
  async index() {
    return await this.solicitationService.get();
  }

  @Role('admin')
  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.solicitationService.getById(id);
  }

  @Role('admin', 'aluno')
  @Get('user/:id')
  async byUserId(@Param('id') id: number) {
    return await this.solicitationService.getByUser(id);
  }

  @Role('aluno')
  @Post()
  async create(@Body() data: CreateSolicitation, @Req() req: Request) {
    return await this.solicitationService.post(req.user, data);
  }

  @Role('admin')
  @Put(':id')
  async update(@Param('id') id: number) {
    return await this.solicitationService.put(id);
  }
}