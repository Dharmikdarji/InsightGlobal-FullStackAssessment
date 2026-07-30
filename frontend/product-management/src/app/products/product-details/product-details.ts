import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  product?: Product;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (Number.isNaN(productId) || productId <= 0) {
      this.router.navigate(['/products']);
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: product => {
        this.product = product;
      },
      error: error => {
        console.error('Failed to load product.', error);
        this.router.navigate(['/products']);
      }
    });
  }
}