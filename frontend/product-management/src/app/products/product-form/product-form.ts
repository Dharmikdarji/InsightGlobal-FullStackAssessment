import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0
  };

  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isNaN(productId) && productId > 0) {
      const existingProduct = this.productService.getProductById(productId);

      if (existingProduct) {
        this.product = { ...existingProduct };
        this.isEditMode = true;
      }
    }
  }

  saveProduct(): void {
    const trimmedName = this.product.name.trim();

    if (!trimmedName) {
      return;
    }

    const productToSave: Product = {
      ...this.product,
      name: trimmedName
    };

    if (this.isEditMode) {
      this.productService.updateProduct(productToSave);
    } else {
      this.productService.addProduct({
        ...productToSave,
        id: Date.now()
      });
    }

    this.router.navigate(['/products']);
  }
}