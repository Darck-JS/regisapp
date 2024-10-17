import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthserviceService } from '../service/authservice.service';
import { Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {

  const authservice = inject(AuthserviceService);
  const router = inject(Router);

  if (authservice.isLoggerinto()) {
    return true;
  }else{
    return router.createUrlTree(['/login']);
  }

  return true;
};
