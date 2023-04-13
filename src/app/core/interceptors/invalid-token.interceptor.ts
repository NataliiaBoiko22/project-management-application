import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class InvalidTokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const language = localStorage.getItem('lang');
        const button = language === 'ukr' ? 'Приховати' : 'Hide';
        let message = '';
        if (err.status === 401) {
          language === 'ukr'
            ? (message = 'Невірний логін чи пароль!')
            : (message = 'Incorrect login or password!');
        }

        // if (err.status === 401 || err.status === 403) {
        //   this.authService.logOut();
        //   throw err;
        if (err.status === 409) {
          language === 'ukr'
            ? (message = 'У Вас вже є акаунт! Виконайте вхід.')
            : (message = 'You already have account! Choose LogIn.');
        }
        this.matSnackBar.open(message, button, {
          duration: 5000,
        });
        throw err;
      })
    );
  }
}
