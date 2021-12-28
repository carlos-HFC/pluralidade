import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { CreateAcademicDTO } from './academic.dto';
import { User } from '../user/user.model';

@Table({ paranoid: true })
export class Academic extends Model<Academic, CreateAcademicDTO> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  institution: string;

  @Column(DataType.STRING)
  degree: string;

  @Column(DataType.STRING)
  name: string;

  @Column({
    type: DataType.STRING(4),
    allowNull: false
  })
  initDate: string;

  @Column(DataType.STRING(4))
  endDate: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}