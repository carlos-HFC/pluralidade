import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { RoleDecorator } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { config } from '../config/multer';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  // @RoleDecorator('admin')
  @Get()
  async index(@Query() query?: FilterUserDTO) {
    return await this.userService.get(query);
  }

  @RoleDecorator('admin')
  @Get(':id')
  async getById(@Param('id') id: number, @Query('inactives') inactives?: 'true' | 'false') {
    return await this.userService.findById(id, inactives);
  }

  @RoleDecorator('admin')
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.post(data);
  }

  @Put()
  @UseInterceptors(FileInterceptor('media', config))
  async update(@Req() req: Request, @Body() data: UpdateUserDTO, @UploadedFile() media: Express.Multer.File) {
    return await this.userService.put(req.user, data, media);
  }

  @RoleDecorator('admin')
  @HttpCode(204)
  @Delete(':id')
  async activeInactive(@Param('id') id: number, @Query('status') status: 'true' | 'false') {
    return await this.userService.activeInactive(id, status);
  }
}