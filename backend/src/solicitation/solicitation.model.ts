import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { CreateSolicitationDTO } from './solicitation.dto';

@Table({ paranoid: true })
export class Solicitation extends Model<Solicitation, CreateSolicitationDTO> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  email: string;

  @Column({
    type: DataType.TEXT,
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