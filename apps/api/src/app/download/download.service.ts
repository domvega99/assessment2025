import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class DownloadService {
  constructor(private readonly configService: ConfigService) {}

  generateDownloadLink(): string {
    const secretKey = this.configService.get<string>('SECRET_KEY');
    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined in the environment variables');
    }

    const payload = {
      userId: 1, // assume user id
      productId: 1, // assume product id
      orderId: 1 // assume order id
    };

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour expiration
    // const expirationTime = Math.floor(Date.now() / 1000) + 20; // 20 secs expiration
    
    return sign({ payload, exp: expirationTime }, secretKey);
  }

  validateDownloadToken(token: string) { // to validate the token
    const secretKey = this.configService.get<string>('SECRET_KEY');
    if (!secretKey) {
      throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    try {
      return verify(token, secretKey);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired download link.');
    }
  }
}
