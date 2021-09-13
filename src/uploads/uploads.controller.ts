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
  @UseInterceptors(FilesInterceptor('images', null, multerOptions))
  uploadFile(@UploadedFiles() files: File[]) {
    console.log('files');
    console.log(files);

    const uploadedFiles: string[] = this.uploadService.uploadFiles(files);

    console.log('uploadedFiles');
    console.log(uploadedFiles);

    return {
      status: 200,
      message: '파일 업로드를 성공하였습니다.',
      data: {
        files: uploadedFiles,
      },
    };
  }
}
