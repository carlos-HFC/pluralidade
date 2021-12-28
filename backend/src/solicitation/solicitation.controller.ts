import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CreateSolicitationDTO } from './solicitation.dto';
import { SolicitationService } from './solicitation.service';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('solicitations')
export class SolicitationController {
  constructor(
    private solicitationService: SolicitationService
  ) { }

  @RoleDecorator('admin')
  @Get()
  async index(@Query('includeUsers') includeUsers?: 'true' | 'false') {
    return await this.solicitationService.get(includeUsers);
  }

  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.solicitationService.findById(id);
  }

  @RoleDecorator('aluno')
  @Post()
  async create(@Body() data: CreateSolicitationDTO, @Req() req: Request) {
    return await this.solicitationService.post(req.user, data);
  }
}