import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CreateExperienceDTO, UpdateExperienceDTO } from './experience.dto';
import { ExperienceService } from './experience.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('experiences')
export class ExperienceController {
  constructor(
    private xpService: ExperienceService
  ) { }

  @Post()
  async store(@Body() data: CreateExperienceDTO) {
    return await this.xpService.post(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateExperienceDTO) {
    return await this.xpService.put(id, data);
  }
}