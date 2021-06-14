import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService
  ) { }

  @Role('admin')
  @Get()
  async index(@Query('type') type?: string) {
    return await this.roleService.getAll(type);
  }

  @Role('admin')
  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.roleService.getById(id);
  }
}