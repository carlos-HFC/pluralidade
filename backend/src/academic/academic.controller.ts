import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CreateAcademic, UpdateAcademic } from '.';
import { AcademicService } from './academic.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('academics')
export class AcademicController {
  constructor(
    private academicService: AcademicService
  ) { }

  @Role('admin')
  @Post()
  async store(@Body() data: CreateAcademic) {
    return await this.academicService.post(data);
  }

  @Role('admin')
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateAcademic) {
    return await this.academicService.put(id, data);
  }
}