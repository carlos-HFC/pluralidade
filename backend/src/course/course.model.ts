import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { CreateCourseDTO } from './course.dto';

@Table({ paranoid: true })
export class Course extends Model<Course, CreateCourseDTO> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  shortDescription: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.ENUM('M', 'T', 'N'),
    allowNull: false,
    set(value: string) {
      this.setDataValue('period', value.trim().toUpperCase());
    }
  })
  period: 'M' | 'T' | 'N';

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  initDate: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false
  })
  endDate: String;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  spots: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  pcd: boolean;
}