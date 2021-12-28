import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDTO {
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @Transform(({ value }) => value.trim())
  title: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @Transform(({ value }) => value.trim())
  description: string;

  @IsDateString({}, { message: 'Data inválida' })
  @IsNotEmpty({ message: 'Data é obrigatória' })
  @Transform(({ value }) => value.trim())
  date: string;

  image: string;
}

export class UpdateEventDTO extends PartialType(CreateEventDTO) { }

export class FilterEventDTO {
  @IsEnum(['true', 'false'], { message: 'Inclusão de inativos inválida' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  inactives?: 'true' | 'false';

  @IsDateString({}, { message: 'Data inválida' })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  date?: string;
}