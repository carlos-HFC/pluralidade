import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateTokenDTO {
  @IsNotEmpty({ message: 'Token é obrigatório' })
  @Transform(({ value }) => value.trim())
  token: string;

  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  @Transform(({ value }) => Number(value.trim()))
  userId: number;
}

export class RefreshTokenDTO {
  @IsNotEmpty({ message: 'Token antigo é obrigatório' })
  @Transform(({ value }) => value.trim())
  oldToken: string
}