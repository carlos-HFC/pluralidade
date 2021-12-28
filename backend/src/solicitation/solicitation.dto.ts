import { PartialType, PickType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateSolicitationDTO {
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @Transform(({ value }) => value.trim())
  description: string;

  userId: number;

  protocol: number
}

export class UpdateSolicitationDTO extends PickType(PartialType(CreateSolicitationDTO), ['description']) { }