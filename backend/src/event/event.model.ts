import { HttpException } from '@nestjs/common';
import { format, isValid, isWeekend, parseISO } from 'date-fns';
import { Op as $ } from 'sequelize';
import { BeforeSave, Column, DataType, Model, Scopes, Table } from 'sequelize-typescript';
import { hourTimeString } from 'src/utils';

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
@Table({ paranoid: true, omitNull: false })
export class Event extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string;

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
  date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  initHour: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  endHour: string;

  @BeforeSave
  static async setDataValues(event: Event) {
    const date = parseISO(event.date);

    event.date = format(date, 'yyyy-MM-dd');
    event.initHour = hourTimeString(event.initHour);
    event.endHour = hourTimeString(event.endHour);
  }
}