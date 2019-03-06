import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { CONFIG } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private as: ApiService) {
  }

  login(data): Observable<any> {
    return this.as.post<any>(
      CONFIG.apiUrls.Login,
      data,
    );
  }

  register(data): Observable<any> {
    return this.as.post<any>(
      CONFIG.apiUrls.Register,
      data,
    );
  }

  logout(): Observable<any> {
    return this.as.post<any>(
      CONFIG.apiUrls.Logout,
    );
  }

  requestResetPassword(data): Observable<any> {
    return this.as.post<any>(
      CONFIG.apiUrls.RequestPasswordReset,
      data,
    );
  }

  changePassword(data): Observable<any> {
    return this.as.post<any>(
      CONFIG.apiUrls.PasswordChange,
      data,
    );
  }
}
