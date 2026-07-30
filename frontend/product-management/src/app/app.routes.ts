import { Routes } from '@angular/router';

import { productExistsGuard } from './guards/product-exists-guard';
import { ProductDetails } from './products/product-details/product-details';
import { ProductForm } from './products/product-form/product-form';
import { ProductList } from './products/product-list/product-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductList
  },
  {
    path: 'products/new',
    component: ProductForm
  },
  {
    path: 'products/:id/edit',
    component: ProductForm,
    canActivate: [productExistsGuard]
  },
  {
    path: 'products/:id',
    component: ProductDetails,
    canActivate: [productExistsGuard]
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];