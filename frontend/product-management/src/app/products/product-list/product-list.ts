import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  products: Product[] = [];
  newProductName = '';

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  addProduct(): void {
    if (!this.newProductName.trim()) {
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: this.newProductName.trim(),
      description: '',
      price: 0,
      quantity: 0
    };

    this.productService.addProduct(product);
    this.products = this.productService.getProducts();

    this.newProductName = '';
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.products = this.productService.getProducts();
  }
}