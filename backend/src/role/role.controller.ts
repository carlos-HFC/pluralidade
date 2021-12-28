import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { RoleService } from './role.service';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@RoleDecorator('admin')
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService
  ) { }

  @Get()
  async index() {
    return await this.roleService.get();
  }

  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.roleService.findById(id);
  }
}