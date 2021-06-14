import { Body, Controller, Param, Post, Put } from '@nestjs/common';

import { CreateExperience, UpdateExperience } from '.';
import { ExperienceService } from './experience.service';

@Controller('experiences')
export class ExperienceController {
  constructor(
    private xpService: ExperienceService
  ) { }

  @Post()
  async store(@Body() data: CreateExperience) {
    return await this.xpService.post(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateExperience) {
    return await this.xpService.put(id, data);
  }
}