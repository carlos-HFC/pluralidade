import { compare, hash } from 'bcrypt';
import { format, parseISO } from 'date-fns';
import { Op as $, col, where } from 'sequelize';
import { BeforeSave, BelongsTo, Column, DataType, DefaultScope, ForeignKey, HasMany, Model, Scopes, Table } from 'sequelize-typescript';

import { Academic } from '../academic/academic.model';
import { Course } from '../course/course.model';
import { Experience } from '../experience/experience.model';
import { Role } from '../role/role.model';
import { Solicitation } from '../solicitation/solicitation.model';

@DefaultScope(() => ({
  include: [Role]
}))
@Scopes(() => ({
  admin: {
    include: [Role],
    where: where(col('role.type'), 'Admin')
  },
  aluno: {
    include: [Role, Course, Solicitation],
    where: where(col('role.type'), 'Aluno')
  },
  all: {
    paranoid: false,
    attributes: {
      exclude: ['hash', 'resetPasswordToken', 'resetPasswordExpires']
    },
    include: [Role, Course, Academic, Experience, Solicitation]
  },
  inactives: {
    paranoid: false,
    attributes: {
      exclude: ['hash', 'resetPasswordToken', 'resetPasswordExpires']
    },
    where: {
      deletedAt: { [$.not]: null }
    },
    include: [Role, Course, Solicitation]
  },
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

  @HasMany(() => Academic)
  academic: Academic[];

  @HasMany(() => Experience)
  experience: Experience[];

  @HasMany(() => Solicitation)
  solicitation: Solicitation[];

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