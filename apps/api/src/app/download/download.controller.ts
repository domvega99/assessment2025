import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';
import { DownloadService } from './download.service';
import { ConfigService } from '@nestjs/config';

@Controller('download')
export class DownloadController {
  constructor(
    private readonly downloadService: DownloadService,
    private readonly configService: ConfigService
  ) {}

  @Get('generate')
  generateLink(
  // we can put here a query or params data for userId, productId and orderId
  ) {
    const baseUrl = this.configService.get<string>('WEBSITE_URL');
    return { link: `${baseUrl}/download/${this.downloadService.generateDownloadLink()}` };
  }

  @Get('confirm/:token')
  // this is for confirming token
  async downloadFile(
    @Param('token') token: string
  ) {
    const decoded = await this.downloadService.validateDownloadToken(token);
    if (!decoded) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return decoded;
  }
}
