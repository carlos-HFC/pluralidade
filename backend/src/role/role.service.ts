import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './role.model';
import { capitalizeFirstLetter } from '../utils';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role
  ) { }

  async get() {
    return await this.roleModel.findAll();
  }

  async findById(id: number) {
    const role = await this.roleModel.findByPk(id);

    if (!role) throw new HttpException("Função não encontrada", 404);

    return role;
  }

  async findByName(name: string) {
    return await this.roleModel.findOne({
      where: {
        name: capitalizeFirstLetter(name).trim()
      }
    });
  }
}