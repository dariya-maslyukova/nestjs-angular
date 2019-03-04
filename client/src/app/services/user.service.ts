import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

import { User } from '../interfaces/user.interface';
import { CONFIG } from '../app.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new Subject<User>();
  private user: User = JSON.parse(localStorage.getItem(CONFIG.localStorageUserKey));

  constructor(private as: ApiService, private ts: ToasterService) {
  }

  getUserInfo(): Observable<User> {
    return this.as
      .post<User>(CONFIG.apiUrls.users)
      .pipe(
        map((user: User) => {
          // We don't need to set current user to this, because this response says we are unauthorized
          if (user.UserName === 'noprivauthtoken') {
            return user;
          }

          this.currentUser = user;

          return user;
        })
      );
  }

  get currentUser$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  get currentUser(): User {
    return this.user;
  }

  set currentUser(user) {
    this.user = user;
    this.userSubject.next(user);
    localStorage.setItem(CONFIG.localStorageUserKey, JSON.stringify(user));
  }

  showUnauthorizedToast(): void {
    this.ts.pop('error', '', 'Unauthorized');
  }

  logout(): void {
    this.currentUser = null;
  }
}
