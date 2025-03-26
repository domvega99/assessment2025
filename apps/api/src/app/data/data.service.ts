import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';

@Injectable()
export class DataService {
  // this is mock user data
  private users: User[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@gmail.com', phoneNumber: '1234567890', password: 'hashedpassword123' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@gmail.com', phoneNumber: '0987654321', password: 'hashedpassword456' },
  ];

  validateUser(email: string, password: string): User | null {
    const user = this.users.find(user => user.email === email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
