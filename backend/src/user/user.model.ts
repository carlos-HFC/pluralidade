import { compare, hash } from 'bcrypt';
import { format, parseISO } from 'date-fns';
import { BeforeSave, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Scopes, Table } from 'sequelize-typescript';

import { CreateUserDTO } from './user.dto';
import { Academic } from '../academic/academic.model';
import { Course } from '../course/course.model';
import { Experience } from '../experience/experience.model';
import { Role } from '../role/role.model';

@Scopes(() => ({
  role: {
    include: [
      {
        model: Role,
        attributes: ['name']
      }
    ]
  }
}))
@Table({ paranoid: true })
export class User extends Model<User, CreateUserDTO> {
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

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  })
  emailVerified: boolean;

  @Column(DataType.STRING)
  tokenEmailVerification?: string;

  @Column(DataType.DATE)
  tokenEmailVerificationExpires?: Date;

  @Column(DataType.STRING)
  hash: string;

  @Column(DataType.VIRTUAL)
  password: string;

  @Column(DataType.STRING)
  tokenResetPassword?: string;

  @Column(DataType.DATE)
  tokenResetPasswordExpires?: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    set(value: string) {
      this.setDataValue('birthday', format(parseISO(value), 'yyyy-MM-dd'));
    }
  })
  birthday: Date;

  @Column(DataType.STRING)
  avatar?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    set(value: string) {
      this.setDataValue('cpf', value.replace(/[\s-.]/g, ''));
    }
  })
  cpf: string;

  @Column({
    type: DataType.ENUM('M', 'F', 'O'),
    allowNull: false,
    set(value: string) {
      this.setDataValue('gender', value.toUpperCase());
    }
  })
  gender: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    set(value: string) {
      this.setDataValue('cep', value.replace(/[\s-]/g, ''));
    }
  })
  cep: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  district: string;

  @Column(DataType.STRING)
  complement?: string;

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
    allowNull: false,
    set(value: string) {
      this.setDataValue('phone', value.replace(/(\+55)?[\s()-]/g, ''));
    }
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

  @BeforeSave
  static async formatData(user: User) {
    if (user.password) user.hash = await hash(user.password, 10);
  }

  checkPass(password: string) {
    return compare(password, this.hash);
  }
}