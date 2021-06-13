import { format, parseISO } from 'date-fns';
import { BeforeSave, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../user/user.model';

@Table({ paranoid: true })
export class Academic extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  institution: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  initDate: string;

  @Column(DataType.STRING)
  endDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  grade: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BeforeSave
  static async setDataValues(academic: Academic) {
    const init = parseISO(academic.initDate);
    academic.initDate = format(init, 'yyyy-MM-dd');

    if (academic.endDate) {
      const end = parseISO(academic.endDate);
      academic.endDate = format(end, 'yyyy-MM-dd');
    }
  }
}