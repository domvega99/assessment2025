import { Controller, Get, Param, UnauthorizedException } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('generate')
  generateLink(
  // we can put here a query or params data for userId, productId and orderId
  ) {
    return { link: `http://localhost:3000/download/${this.downloadService.generateDownloadLink()}` };
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
