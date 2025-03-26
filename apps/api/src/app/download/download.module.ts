import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataService } from '../data/data.service';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';

@Module({
  imports: [
    ConfigModule.forRoot(), 
  ],
  controllers: [DownloadController],
  providers: [DownloadService, DataService],
})
export class DownloadModule {}
