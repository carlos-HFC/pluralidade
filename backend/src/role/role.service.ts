import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op as $ } from 'sequelize';

import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role
  ) { }

  async getAll(type?: string) {
    if (type) return await this.getByType(type);

    return await this.roleModel.findAll();
  }

  async getById(id: number) {
    const role = await this.roleModel.findByPk(id);

    if (!role) throw new HttpException("Função não encontrada", 404);

    return role;
  }

  async getByType(type: string) {
    if (type.trim().length < 3) throw new HttpException("Tipo não tem caracteres suficientes para efetuar o filtro", 400);

    const role = await this.roleModel.findOne({
      where: {
        type: {
          [$.startsWith]: type.trim()
        }
      }
    });

    if (!role) throw new HttpException("Função não encontrada", 404);

    return role;
  }
}