import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {firstValueFrom} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return firstValueFrom(authService.currentUser).then(r=>{
    if (r != null) {
      return true;
    }
    router.navigateByUrl("/login");

    return false;
  })
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return firstValueFrom(authService.currentUser).then(r=>{
    if (!r) {
      return true;
    }
    router.navigate(['/account']);
    return false;
  })
}
