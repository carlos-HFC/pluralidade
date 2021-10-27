import { HttpException } from '@nestjs/common';

export class UploadService {
  post(file: Express.Multer.File) {
    if (!file.mimetype.includes('image')) throw new HttpException('Arquivo não suportado', 400);

    return `http://localhost:8000/uploads/${file.filename}`;
  }
}