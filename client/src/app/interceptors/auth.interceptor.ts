import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private ts: ToasterService, private us: UserService, private r: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next
      .handle(request.clone({ withCredentials: true }))
      .pipe(
        map((response: HttpResponse<any>) => {
          if (typeof response.body === 'object' && 'errorDetails' in response.body) {
            // TODO: Add proper error text and check for error type
            // TODO: Also implement interface to describe error response from API
            // this.ts.pop('error', '', response.body['errorDetails'][0]);
            if (response.body[ 'errorDetails' ][ 0 ] === 'Not Authorised for: *') {
              this.us.currentUser = null;
              // this.us.showUnauthorizedToast();  //Commented as we are redirecting to login screen now.

              this.r.navigate(['/auth/login']);
            } else {
              this.ts.pop('error', '', 'Request error');
            }

            return response;
          }

          return response;
        })
      );
  }

}
