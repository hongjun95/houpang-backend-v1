import { extname } from 'path';
import { uuid } from 'uuidv4';

export const parseUuidFileName = (file: Express.Multer.File) => {
  const uuidPath = `${uuid()}${extname(file.originalname)}`;
  return uuidPath;
};

export const createImageURL = (file): string => {
  return `http://localhost:4000/${file.filename}`;
};
