import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const currentUser = loginService.isAuthenticated();

  if (!currentUser) {
    console.warn('Access denied - User not logged in');
    router.navigate(['']); 
    return false;
  }

  
  if (state.url === '/user-list' && !loginService.isAdmin()) {
    console.warn('Access denied - Not an admin');
    router.navigate(['/home']); 
    return false;
  }

  return true;
};