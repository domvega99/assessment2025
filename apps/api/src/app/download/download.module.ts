import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { DataService } from '../data/data.service';

@Module({
  controllers: [DownloadController],
  providers: [DownloadService, DataService],
})
export class DownloadModule {}
