import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { User } from '../../models/user.model';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  // to login user, for more advance ( use hashed password, and token for single user )
  @Post('login')
  login(@Body() loginDto: { email: string; password: string }): User | { message: string } {
    const { email, password } = loginDto;
    const user = this.dataService.validateUser(email, password);
    if (!user) {
      return { message: 'Invalid email or password' };
    }
    return user;
  }
}
