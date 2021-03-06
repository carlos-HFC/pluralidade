import { isBefore } from 'date-fns';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { CreateEventDTO } from './event.dto';

@Table({ paranoid: true })
export class Event extends Model<Event, CreateEventDTO> {
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  title: string;

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
    type: DataType.DATE,
    allowNull: false
  })
  date: Date;

  @Column({
    type: DataType.VIRTUAL,
    get(this: Event) {
      return isBefore(this.date, new Date());
    }
  })
  past: boolean;
}