import { diskStorage } from 'multer';
import { resolve } from 'path';

import { createTokenHEX } from '../utils';

export const config = {
  storage: diskStorage({
    destination: resolve(__dirname, '..', 'uploads'),
    filename(_, file, cb) {
      const hash = createTokenHEX();

      const fileName = `${hash}__${file.originalname}`;

      cb(null, fileName);
    }
  })
};