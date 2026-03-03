import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformID = inject(PLATFORM_ID);
  if(isPlatformBrowser(platformID)){
  const token = localStorage.getItem('token');
  if(token){
    const authReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);

  }
  }
  return next(req);

};
