import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { CreateSolicitationDTO } from './solicitation.dto';
import { SolicitationService } from './solicitation.service';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';

@Controller('solicitations')
export class SolicitationController {
  constructor(
    private solicitationService: SolicitationService
  ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Get()
  async index() {
    return await this.solicitationService.get();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.solicitationService.findById(id);
  }

  @Post()
  async create(@Body() data: CreateSolicitationDTO) {
    return await this.solicitationService.post(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RoleDecorator('admin')
  @Patch()
  async read(@Param('id') id: number) {
    return await this.solicitationService.readSolicitation(id);
  }
}