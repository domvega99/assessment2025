import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { DataService } from '../data/data.service';

@Injectable()
export class DownloadService {
  private SECRET_KEY = 'your-secret-key';

  constructor(private readonly mockDataService: DataService) {}

  generateDownloadLink(userId: string, productId: string): string {
    const order = this.mockDataService.getOrderByUserAndProduct(userId, productId);
    if (!order) {
      throw new UnauthorizedException('You have not purchased this report.');
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1-hour expiry
    return sign({ userId, productId, exp: expirationTime }, this.SECRET_KEY);
  }

  validateDownloadToken(token: string) {
    try {
      return verify(token, this.SECRET_KEY);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired download link.');
    }
  }
}
