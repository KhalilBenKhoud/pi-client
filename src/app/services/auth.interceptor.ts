import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const unallowedRequests = [
	'/auth/refresh_token',
	'/auth/register',
	'/auth/login',
  '/auth/logout'    
];

const externalApi = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!unallowedRequests.includes(request.url.substring(`${environment.BaseApiUrl}`.length)) && !request.url.includes(externalApi)) {
      console.log('Request URL:', request.url.substring(`${environment.BaseApiUrl}`.length));
      console.log('Base URL Length:', `${environment.BaseApiUrl}`.length);

      const token = localStorage.getItem('accessToken');
      if (token) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }
    }
    return next.handle(request).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403 || error.status === 0)) {
            const isWhitelisted = !unallowedRequests.includes(request.url.substring(`${environment.BaseApiUrl}`.length));
            if (isWhitelisted ) {
              return this.handleUnauthorized(request, next);
            }
          }
          return throwError(error);
        })
      );
    }

    private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
          switchMap((response : any) => {
            localStorage.setItem('accessToken', response.access_token);
            console.warn("from interceptor",response.access_token) ;
            return next.handle(
              request.clone({
                setHeaders: { Authorization: `Bearer ${response.access_token}` },
              })
            );
          }),
          catchError((error) => {console.error(error) ; return throwError(error) })
        );
    

        }
    }
