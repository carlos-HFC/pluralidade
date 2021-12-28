import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExperienceDTO {
  @IsNotEmpty({ message: 'Nome da empresa é obrigatório' })
  @Transform(({ value }) => value.trim())
  company: string;

  @IsNotEmpty({ message: 'Cargo é obrigatório' })
  @Transform(({ value }) => value.trim())
  office: string;

  @IsNotEmpty({ message: 'Data de início é obrigatória' })
  @Transform(({ value }) => value.trim())
  initDate: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  endDate?: string;

  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  userId: number;
}

export class UpdateExperienceDTO extends PartialType(CreateExperienceDTO) { }