import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'Developer laptop',
      price: 1499.99,
      quantity: 5
    },
    {
      id: 2,
      name: 'Monitor',
      description: '27-inch display',
      price: 399.99,
      quantity: 10
    }
  ];

  getProducts(): Product[] {
    return [...this.products];
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }
}