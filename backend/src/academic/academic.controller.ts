import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CreateAcademicDTO, UpdateAcademicDTO } from './academic.dto';
import { AcademicService } from './academic.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('academics')
export class AcademicController {
  constructor(
    private academicService: AcademicService
  ) { }

  @Post()
  async store(@Body() data: CreateAcademicDTO) {
    return await this.academicService.post(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateAcademicDTO) {
    return await this.academicService.put(id, data);
  }
}