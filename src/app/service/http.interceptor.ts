import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert';

@Injectable()
export class ErroHandlerInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        let _handle: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
          } else {
            switch (error.status) {
              case 401:
                Swal({
                  icon: 'error',
                  text: 'Session expired please re-login.',
                  dangerMode: true,
                  closeOnClickOutside: false,
                }).then(() => {
                  sessionStorage.clear();
                  sessionStorage.clear();
                  this._router.navigate(['login']);
                });
                break;

              case 500:
                Swal({
                  icon: 'error',
                  text: 'Internal Server Error.Kindly contact IT team.',
                  dangerMode: true,
                  closeOnClickOutside: false,
                });
                _handle = true;
                break;
            }
          }
        } else {
        }
        if (_handle) {
          return of(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
