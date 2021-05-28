import { compare, hash } from 'bcrypt';
import { format, parseISO } from 'date-fns';
import { Op as $ } from 'sequelize';
import { BeforeSave, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Model, Scopes, Table } from 'sequelize-typescript';

import { Course } from '../course/course.model';
import { Role } from '../role/role.model';

@DefaultScope(() => ({
  include: [
    { model: Role }
  ]
}))
@Scopes(() => ({
  all: {
    paranoid: false,
    attributes: {
      exclude: ['hash', 'resetPasswordToken', 'resetPasswordExpires']
    },
    include: [
      { model: Role }
    ]
  },
  inactives: {
    paranoid: false,
    attributes: {
      exclude: ['hash', 'resetPasswordToken', 'resetPasswordExpires']
    },
    where: {
      deletedAt: { [$.not]: null }
    },
    include: [
      { model: Role }
    ]
  }
}))
@Table({ paranoid: true, omitNull: false })
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column(DataType.STRING)
  hash: string;

  @Column(DataType.VIRTUAL)
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  birthday: string;

  @Column(DataType.STRING)
  avatar?: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    unique: true
  })
  cpf: string;

  @Column({
    type: DataType.ENUM('M', 'F', 'O'),
    allowNull: false
  })
  gender: string;

  @Column({
    type: DataType.STRING(8),
    allowNull: false,
  })
  cep: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address: string;

  @Column(DataType.STRING)
  number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  district: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  city: string;

  @Column({
    type: DataType.STRING(2),
    allowNull: false,
    set(value: string) {
      this.setDataValue('uf', value.toUpperCase());
    }
  })
  uf: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  deficient: boolean;

  @Column(DataType.STRING)
  whichDeficiency?: string;

  @Column(DataType.STRING)
  resetPasswordToken?: string;

  @Column(DataType.STRING)
  resetPasswordExpires?: string;

  @ForeignKey(() => Role)
  @Column({ allowNull: false })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Course)
  @Column
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @BeforeSave
  static async hashPass(user: User) {
    if (user.password) return user.hash = await hash(user.password, 10);
  }

  @BeforeSave
  static async setDates(user: User) {
    return user.birthday = format(parseISO(user.birthday), 'yyyy-MM-dd');
  }

  checkPass(password: string) {
    return compare(password, this.hash);
  }
}