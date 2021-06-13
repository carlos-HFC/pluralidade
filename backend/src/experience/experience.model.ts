import { format, parseISO } from 'date-fns';
import { BeforeSave, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../user/user.model';

@Table({ paranoid: true })
export class Experience extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  company: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  office: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  volunteer: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  initDate: string;

  @Column(DataType.STRING)
  endDate: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BeforeSave
  static async setDataValues(xp: Experience) {
    const init = parseISO(xp.initDate);
    xp.initDate = format(init, 'yyyy-MM-dd');

    if (xp.endDate) {
      const end = parseISO(xp.endDate);
      xp.endDate = format(end, 'yyyy-MM-dd');
    }
  }
}