import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';

@Injectable()
export class DataService {
  private users: User[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890', password: 'hashedpassword123' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '0987654321', password: 'hashedpassword456' },
  ];

  private products: Product[] = [
    { id: 'p1', title: 'Inspection Report - House 123', resalePrice: 100, inspectorId: '10', privateFileNameOnS3: 'report123.pdf' },
    { id: 'p2', title: 'Inspection Report - Apartment 456', resalePrice: 200, inspectorId: '11', privateFileNameOnS3: 'report456.pdf' },
  ];

  private orders: Order[] = [
    { id: 'o1', productId: 'p1', purchaserId: '1', purchaseDate: new Date('2024-01-01') },
    { id: 'o2', productId: 'p2', purchaserId: '2', purchaseDate: new Date('2024-02-01') },
  ];

  getUsers(): User[] {
    return this.users;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getOrderByUserAndProduct(userId: string, productId: string): Order | undefined {
    return this.orders.find((order) => order.purchaserId === userId && order.productId === productId);
  }
}
