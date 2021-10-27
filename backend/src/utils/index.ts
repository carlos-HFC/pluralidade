import { HttpException } from '@nestjs/common';
import { randomBytes } from 'crypto';

export function trimObj(obj: object) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') obj[key] = obj[key].trim();
  }
}

export function capitalizeFirstLetter(str: string) {
  trimObj({ str });
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createTokenHEX(size: number = 20) {
  return randomBytes(size).toString('hex');
}

export function validateCPF(cpf: string) {
  let sum = 0, rest = 0;

  switch (true) {
    case cpf === '00000000000':
    case cpf === '11111111111':
    case cpf === '22222222222':
    case cpf === '33333333333':
    case cpf === '44444444444':
    case cpf === '55555555555':
    case cpf === '66666666666':
    case cpf === '77777777777':
    case cpf === '88888888888':
    case cpf === '99999999999':
    case cpf.length !== 11:
      throw new HttpException("CPF inválido", 400);
    default:
      break;
  }

  for (let i = 1; i <= 9; i++) sum = sum + Number(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== Number(cpf.substring(9, 10))) throw new HttpException("CPF inválido", 400);

  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + Number(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== Number(cpf.substring(10, 11))) throw new HttpException("CPF inválido", 400);
}

export function convertBool(value: 'true' | 'false') {
  return ({
    'true': true,
    'false': false,
  })[value];
}