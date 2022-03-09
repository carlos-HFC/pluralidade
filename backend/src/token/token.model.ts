import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { CreateTokenDTO } from './token.dto';
import { User } from '../user/user.model';

@Table({ paranoid: true })
export class Token extends Model<Token, CreateTokenDTO> {
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  token: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;
}