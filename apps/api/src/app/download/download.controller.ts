import { Controller, Get, Query, Res, UnauthorizedException } from '@nestjs/common';
import type { Response } from 'express'; // Use "import type"
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('generate')
  generateLink(
    @Query('userId') userId: string, 
    @Query('productId') productId: string
  ) {
    return { link: `http://localhost:3000/download?token=${this.downloadService.generateDownloadLink(userId, productId)}` };
  }

  @Get()
  downloadFile(
    @Query('token') token: string, 
    @Res() res: Response // `Response` is now correctly imported
  ) {
    try {
      const payload = this.downloadService.validateDownloadToken(token) as { userId: string; productId: string };
      res.download(`./mock-storage/${payload.productId}.pdf`);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired download link.');
    }
  }
}
