import { BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table } from 'sequelize-typescript';

import { CreateSolicitationDTO } from './solicitation.dto';
import { User } from '../user/user.model';

@Scopes(() => ({
  user: {
    include: [
      {
        model: User,
        attributes: ['name', 'email']
      }
    ]
  }
}))
@Table({ paranoid: true })
export class Solicitation extends Model<Solicitation, CreateSolicitationDTO> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false
  })
  protocol: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}