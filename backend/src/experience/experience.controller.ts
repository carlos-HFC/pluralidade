import { Body, Controller, Post } from '@nestjs/common';

import { CreateExperience } from '.';
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
}