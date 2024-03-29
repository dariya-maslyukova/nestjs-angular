import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  constructor(private router: Router, @Inject('LOCALSTORAGE') private localStorage: any) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorage.getItem('currentUser')) {
      return (state.url.startsWith('/profile')) ? true : (this.router.navigate(['/auth']), false);
    } else {
      return (state.url.startsWith('/profile')) ? (this.router.navigate(['/auth']), false) : true;
    }
  }

}
