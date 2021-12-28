import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length, Max } from 'class-validator';

export class CreateAcademicDTO {
  @IsNotEmpty({ message: 'Instituição é obrigatória' })
  @Transform(({ value }) => value.trim())
  institution: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  name?: string;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  degree?: string;

  @Length(4, 4, { message: 'Data de início inválida' })
  @IsNotEmpty({ message: 'Data de início é obrigatória' })
  @Transform(({ value }) => value.trim())
  initDate: string;

  @IsOptional()
  @Length(4, 4, { message: 'Data de conclusão inválida' })
  @Transform(({ value }) => value.trim())
  endDate?: string;

  @IsNotEmpty({ message: 'Usuário é obrigatório' })
  userId: number;
}

export class UpdateAcademicDTO extends OmitType(PartialType(CreateAcademicDTO), ['userId']) { }