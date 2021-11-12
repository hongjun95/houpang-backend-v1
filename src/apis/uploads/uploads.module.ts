import { Module } from '@nestjs/common';
import { UploadsController } from '@apis/uploads/uploads.controller';
import UploadsService from '@apis/uploads/uploads.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
