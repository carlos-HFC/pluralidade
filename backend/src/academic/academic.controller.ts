import { Body, Controller, Post } from '@nestjs/common';

import { CreateAcademic } from '.';
import { AcademicService } from './academic.service';

@Controller('academics')
export class AcademicController {
  constructor(
    private academicService: AcademicService
  ) { }

  @Post()
  async store(@Body() data: CreateAcademic) {
    return await this.academicService.post(data);
  }
}