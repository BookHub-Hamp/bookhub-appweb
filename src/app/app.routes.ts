import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

import { BookDetailsComponent } from './shared/components/book-details/book-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/public-content/public-content.routes').then(m => m.publicContentRoutes)
  },

  {
    path: 'auth',

    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
    canActivate: [authInverseGuard] ,
  },
  {
    path: 'customer',

    loadChildren: () => import('./pages/customer/customer.routes').then(m => m.customerRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'author',
    loadChildren: () => import('./pages/author/author.routes').then(m => m.authorRoutes),
    canActivate: [authGuard]
  }
];
