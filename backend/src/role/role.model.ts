import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ paranoid: true })
export class Role extends Model<Role> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;
}