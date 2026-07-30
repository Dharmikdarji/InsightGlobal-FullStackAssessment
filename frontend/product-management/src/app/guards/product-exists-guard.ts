import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { ProductService } from '../services/product';

export const productExistsGuard: CanActivateFn = route => {
  const productService = inject(ProductService);
  const router = inject(Router);

  const productId = Number(route.paramMap.get('id'));

  if (!Number.isInteger(productId) || productId <= 0) {
    return router.createUrlTree(['/products']);
  }

  return productService.getProductById(productId).pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/products'])))
  );
};