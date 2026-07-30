import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  readonly products = signal<Product[]>([]);

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products.update(products =>
          products.filter(product => product.id !== id)
        );
      },
      error: error => {
        console.error('Failed to delete product.', error);
      }
    });
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products.set(products);
      },
      error: error => {
        console.error('Failed to load products.', error);
      }
    });
  }
}