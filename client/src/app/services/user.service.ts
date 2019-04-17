import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

import { User } from '../interfaces/user.interface';
import { CONFIG } from '../app.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject = new Subject<User>();
  private user: User = JSON.parse(localStorage.getItem(CONFIG.localStorageUserKey));

  constructor(private as: ApiService) {
  }

  // Get User Profile
  getUserProfile(): Observable<object> {
    return this.as.get<User>(CONFIG.apiUrls.Profile);
  }

  get currentUser$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  get currentUser(): User {
    return this.user as User;
  }

  set currentUser(user) {
    this.user = user;
    this.userSubject.next(user);
    localStorage.setItem(CONFIG.localStorageUserKey, JSON.stringify(user));
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(CONFIG.localStorageUserKey);
  }
}
