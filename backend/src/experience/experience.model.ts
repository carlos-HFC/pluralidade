import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { CreateExperienceDTO } from './experience.dto';
import { User } from '../user/user.model';

@Table({ paranoid: true })
export class Experience extends Model<Experience, CreateExperienceDTO> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  company: string;

  @Column({
    type: DataType.STRING(75),
    allowNull: false
  })
  office: string;

  @Column({
    type: DataType.STRING(7),
    allowNull: false
  })
  initDate: string;

  @Column(DataType.STRING(7))
  endDate: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}