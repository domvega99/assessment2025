import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadModule } from './download/download.module';
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    DownloadModule, 
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
