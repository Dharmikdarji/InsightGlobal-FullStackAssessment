import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { ProductService } from '../services/product';

export const productExistsGuard: CanActivateFn = (route) => {
  const productService = inject(ProductService);
  const router = inject(Router);

  const productId = Number(route.paramMap.get('id'));

  if (Number.isNaN(productId)) {
    router.navigate(['/products']);
    return false;
  }

  const product = productService.getProductById(productId);

  if (!product) {
    router.navigate(['/products']);
    return false;
  }

  return true;
};