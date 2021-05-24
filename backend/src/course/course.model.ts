import { HttpException } from '@nestjs/common';
import { format, isValid, parseISO, subDays } from 'date-fns';
import { Op as $ } from 'sequelize';
import { BeforeSave, Column, DataType, Model, Scopes, Table } from 'sequelize-typescript';

@Scopes(() => ({
  all: {
    paranoid: false
  },
  inactives: {
    paranoid: false,
    where: {
      deletedAt: { [$.not]: null }
    }
  }
}))
@Table({ paranoid: true })
export class Course extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue('image', `http://${process.env.DB_HOST}:8000/uploads/${value}`);
    }
  })
  image: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  period: string;

  @Column(DataType.STRING)
  limitDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  initDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  endDate: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  spots: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  pcd: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  closed: boolean;

  @BeforeSave
  static async setDataValues(course: Course) {
    const init = parseISO(course.initDate);
    const end = parseISO(course.endDate);

    course.limitDate = format(subDays(init, 5), 'yyyy-MM-dd');
    course.initDate = format(init, 'yyyy-MM-dd');
    course.endDate = format(end, 'yyyy-MM-dd');
  }
}