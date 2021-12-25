import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

import { parseUuidFileName } from '@utils';
// import { existsSync, mkdirSync } from 'fs';
// import { diskStorage } from 'multer';
// import getProcessEnv from './getProcessEnv';
// import uuidRandom from './uuidRandom';

export const multerOptions: MulterOptions = {
  fileFilter: (
    req: any,
    file: {
      mimetype: string;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(new Error('지원하지 않는 이미지 형식입니다.'), false);
    }
    callback(null, true);
  },

  storage: diskStorage({
    destination: (req, file, callback) => {
      const uploadPath = 'public';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename: (req, file, callback) => {
      callback(null, parseUuidFileName(file));
    },
  }),
};
