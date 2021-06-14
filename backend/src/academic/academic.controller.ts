import { Body, Controller, Param, Post, Put } from '@nestjs/common';

import { CreateAcademic, UpdateAcademic } from '.';
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

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateAcademic) {
    return await this.academicService.put(id, data);
  }
}