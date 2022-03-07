import { PartialType, PickType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSolicitationDTO {
  @IsNotEmpty({ message: 'Nome é obrigatória' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'E-mail é obrigatória' })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @Transform(({ value }) => value.trim())
  description: string;

  read: boolean;
}