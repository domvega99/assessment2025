import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadModule } from './download/download.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [DownloadModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
