import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsPostalCode, MinLength, ValidateIf } from 'class-validator';

import { Match } from '../common/pipes/match.pipe';
import { capitalizeFirstLetter } from '../utils';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsDateString({ strict: true }, { message: 'Data de nascimento inválida' })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  @Transform(({ value }) => value.trim())
  birthday: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @Transform(({ value }) => value.trim())
  cpf: string;

  @IsEnum(['M', 'F', 'O'], { message: 'Gênero inválido' })
  @IsNotEmpty({ message: 'Gênero é obrigatório' })
  @Transform(({ value }) => capitalizeFirstLetter(value).trim())
  gender: string;

  @IsPostalCode('BR', { message: 'CEP inválido' })
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @Transform(({ value }) => value.trim().replace(/(\d{5})(\d{3})/, '$1-$2'))
  cep: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  @Transform(({ value }) => value.trim())
  address: string;

  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  @Transform(({ value }) => value.trim())
  district: string;

  @IsOptional()
  complement?: string;

  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  @Transform(({ value }) => value.trim())
  city: string;

  @IsNotEmpty({ message: 'UF é obrigatória' })
  @Transform(({ value }) => value.trim())
  uf: string;

  @IsPhoneNumber('BR', { message: 'Telefone inválido' })
  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @Transform(({ value }) => value.trim().replace(/(\+55)/g, ''))
  phone: string;

  @IsNotEmpty({ message: 'Tem deficiência é obrigatória' })
  deficient: boolean;

  @ValidateIf((obj, _) => obj.deficient)
  @IsNotEmpty({ message: 'Quais deficiências é obrigatória' })
  @Transform(({ value }) => value.trim())
  whichDeficiency?: string;

  roleId: number;

  password: string;

  emailVerifieid: boolean;
  
  tokenEmailVerification: string;

  tokenEmailVerificationExpires: Date;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsOptional()
  oldPassword?: string;

  @ValidateIf((obj, _) => obj.oldPassword)
  @MinLength(8, { message: 'Nova senha precisa conter, no mínimo, 8 caracteres' })
  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  password?: string;

  @ValidateIf((obj, _) => obj.password)
  @Match('password', { message: 'Nova senha e confirmação de senha não correspondem' })
  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  confirmPassword?: string;
}

export class FilterUserDTO {
  @IsEnum(['true', 'false'], { message: 'Inclusão de inativos inválida' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  inactives?: 'true' | 'false';

  @IsEnum(['Admin', 'Aluno'], { message: 'Função de usuário inválida' })
  @IsOptional()
  @Transform(({ value }) => capitalizeFirstLetter(value).trim())
  role?: 'Admin' | 'Aluno';
}