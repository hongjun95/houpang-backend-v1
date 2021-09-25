import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multerOptions';
import UploadService from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('files', null, multerOptions))
  uploadFile(@UploadedFiles() files) {
    const uploadedFiles: string[] = this.uploadService.uploadFiles(files);

    return {
      status: 200,
      message: '파일 업로드를 성공하였습니다.',
      data: {
        urls: uploadedFiles,
      },
    };
  }
}
