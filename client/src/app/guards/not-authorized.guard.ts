import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { UserService } from '../../../../server/src/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {

  constructor( private r: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if (!this.us.currentUser) {
    //   return true;
    // }

    this.r.navigate([ '' ]);

    return false;
  }
}
