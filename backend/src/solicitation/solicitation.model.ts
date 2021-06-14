import { getTime } from 'date-fns';
import { BeforeSave, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../user/user.model';

@Table({ paranoid: true })
export class Solicitation extends Model {
  @Column({
    type: DataType.BIGINT,
    unique: true
  })
  protocol: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  openedAt: string;

  @Column(DataType.STRING)
  closedAt: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  done: boolean;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BeforeSave
  static async setProtocol(solicitation: Solicitation) {
    solicitation.protocol = getTime(new Date());
  }
}