import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
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
  product: Product = this.createEmptyProduct();

  isEditMode = false;
  isSaving = false;
  isLoading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productService: ProductService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(productId) || productId <= 0) {
      return;
    }

    this.isEditMode = true;
    this.isLoading = true;

    this.productService.getProductById(productId).subscribe({
      next: product => {
        this.product = product;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: error => {
        console.error('Failed to load product.', error);
        this.router.navigate(['/products']);
      }
    });
  }

  saveProduct(): void {
    const trimmedName = this.product.name.trim();

    if (!trimmedName || this.isSaving || this.isLoading) {
      return;
    }

    const productToSave: Product = {
      ...this.product,
      name: trimmedName
    };

    this.isSaving = true;

    if (this.isEditMode) {
      this.updateProduct(productToSave);
      return;
    }

    this.createProduct(productToSave);
  }

  private createProduct(product: Product): void {
    this.productService.createProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: error => {
        this.isSaving = false;
        this.changeDetectorRef.detectChanges();
        console.error('Failed to create product.', error);
      }
    });
  }

  private updateProduct(product: Product): void {
    this.productService.updateProduct(product.id, product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: error => {
        this.isSaving = false;
        this.changeDetectorRef.detectChanges();
        console.error('Failed to update product.', error);
      }
    });
  }

  private createEmptyProduct(): Product {
    return {
      id: 0,
      name: '',
      description: '',
      price: 0,
      quantity: 0
    };
  }
}