import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ paranoid: true })
export class Role extends Model<Role> {
  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  name: string;
}