import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CreateExperience, UpdateExperience } from '.';
import { ExperienceService } from './experience.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('experiences')
export class ExperienceController {
  constructor(
    private xpService: ExperienceService
  ) { }

  @Role('admin')
  @Post()
  async store(@Body() data: CreateExperience) {
    return await this.xpService.post(data);
  }

  @Role('admin')
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateExperience) {
    return await this.xpService.put(id, data);
  }
}