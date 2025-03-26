import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class DownloadService {
  private SECRET_KEY = 'your-secret-key'; // you can move this to .env for more secure

  generateDownloadLink(): string {
    const payload = {
      userId: 1, // assume user id
      productId: 1, // assume product id
      orderId: 1 // assume order id
    };

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour expiration
    // const expirationTime = Math.floor(Date.now() / 1000) + 20; // 20 secs expiration
    return sign({ payload, exp: expirationTime }, this.SECRET_KEY);
  }

  validateDownloadToken(token: string) { // to validate the token
    try {
      return verify(token, this.SECRET_KEY);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired download link.');
    }
  }
}
