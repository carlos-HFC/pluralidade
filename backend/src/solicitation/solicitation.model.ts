import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { CreateSolicitationDTO } from './solicitation.dto';

@Table({ paranoid: true })
export class Solicitation extends Model<Solicitation, CreateSolicitationDTO> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  read: boolean;
}