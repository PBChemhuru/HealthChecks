import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const currentUser = loginService.isAuthenticated();

  if (state.url === '/user-list' && !loginService.isAdmin()) {
    
    router.navigate(['/home']);
    return false;
  }
  else{
    
  }

  if (!currentUser) {
    router.navigate(['']);
    return false;
  }

  return true;
};