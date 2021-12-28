import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @Transform(({ value }) => value.trim())
  description: string;

  @IsEnum(['M', 'T', 'N'], { message: 'Período inválido' })
  @IsNotEmpty({ message: 'Período é obrigatório' })
  @Transform(({ value }) => value.trim().toUpperCase())
  period: 'M' | 'T' | 'N';

  @IsDateString({}, { message: 'Data de início inválida' })
  @IsNotEmpty({ message: 'Data de início é obrigatória' })
  @Transform(({ value }) => value.trim())
  initDate: string;

  @Min(10, { message: 'Número de vagas precisa ser de, no mínimo, dez' })
  @Max(30, { message: 'Número de vagas precisa ser de, no máximo, trinta' })
  @IsNotEmpty({ message: 'Número de vagas é obrigatório' })
  @Transform(({ value }) => Number(value.trim()))
  spots: number;

  @IsOptional()
  pcd?: boolean;

  @Min(1, { message: 'Tempo do curso precisa ser de, no mínimo, um mês' })
  @Max(24, { message: 'Tempo do curso precisa ser de, no máximo, 24 meses (2 anos)' })
  @IsNotEmpty({ message: 'Tempo do curso é obrigatório' })
  @Transform(({ value }) => Number(value.trim()))
  months: number;

  image: string;

  endDate: string;
}

export class UpdateCourseDTO extends PartialType(CreateCourseDTO) { }

export class FilterCourseDTO {
  @IsEnum(['true', 'false'], { message: 'Inlcusão de inativos inválida' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  inactives?: 'true' | 'false';

  @IsOptional()
  @Transform(({ value }) => value.trim())
  name?: string;

  @Min(1, { message: 'Mês inválido' })
  @Max(12, { message: 'Mês inválido' })
  @IsOptional()
  @Transform(({ value }) => Number(value.trim()))
  month?: string;

  @IsEnum(['M', 'T', 'N'], { message: 'Período inválido' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toUpperCase())
  period?: 'M' | 'T' | 'N';

  @IsEnum(['true', 'false'], { message: 'Busca por PCD inválida' })
  @IsOptional()
  @Transform(({ value }) => value.trim().toLowerCase())
  pcd?: 'true' | 'false';
}