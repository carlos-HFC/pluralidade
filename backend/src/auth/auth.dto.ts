import { PickType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { Match } from '../common/pipes/match.pipe';

export class LoginDTO {
  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @Transform(({ value }) => value.trim())
  password: string;
}

export class ForgotPasswordDTO extends PickType(LoginDTO, ['email']) { }

export class ResetPasswordDTO {
  @IsNotEmpty({ message: 'Token é obrigatório' })
  @Transform(({ value }) => value.trim())
  token: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @Transform(({ value }) => value.trim())
  email: string;

  @MinLength(8, { message: 'Senha precisa ter, no mínimo, 8 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @Transform(({ value }) => value.trim())
  password: string;

  @Match('password', { message: 'Nova senha e confirmação de senha não correspondem' })
  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  @Transform(({ value }) => value.trim())
  confirmPassword: string;
}
