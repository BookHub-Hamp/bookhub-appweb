import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole();

    if (userRole === 'AUTHOR') {
      router.navigate(['/author']);
    } else if (userRole === 'CUSTOMER') {
      router.navigate(['/customer']);
    }

    return false;
  }

  return true;
};
