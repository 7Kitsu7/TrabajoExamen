import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Si no hay token, redirige al login
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Si el token existe, permite el acceso
  return true;
};
