import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalstorageService } from './localstorage.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  // Inicializar servicios solo si estamos en el navegador
  const localStorageService = isBrowser ? inject(LocalstorageService) : null;
  const router = isBrowser ? inject(Router) : null;

  // Agregar token al encabezado si existe
  let token: string | null = null;
  if (isBrowser && localStorageService) {
    token = localStorageService.getItem('accessToken');
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Manejar errores específicos
      if (isBrowser && err.status === 401 && router) {
        console.warn('⚠️ Error 401: Redirigiendo al login...');
        router.navigate(['/login']);
      }

      // Propagar el error para que otros interceptores o componentes lo manejen
      return throwError(() => err.error || 'An unexpected error occurred');
    })
  );
};