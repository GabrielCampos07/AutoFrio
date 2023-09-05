// interceptor de autenticação

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SecurityService } from 'src/app/shared/services/security.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private SecurityService: SecurityService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.SecurityService.getToken().pipe(
      switchMap((token) => {
        let headers = req.url.includes(environment.api)
          ? req.headers
              .set('Content-Type', 'application/json')
              .set('ApplicationId', 'autofrio')
          : req.headers.set('Content-Type', 'application/json');

        if (token && req.url.includes(environment.api)) {
          headers = req.headers.set('Authorization', 'Bearer ' + token);
        }

        const duplicate = req.clone({ headers: headers });

        return next.handle(duplicate).pipe(
          catchError((e: HttpErrorResponse) => {
            if (e.status === 401) {
              this.router.navigate(['/login']);
            }

            return throwError(e.error);
          })
        );
      })
    );
  }
}
