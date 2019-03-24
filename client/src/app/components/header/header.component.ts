import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavItem } from '../../interfaces/nav/nav-item.interface';
import { User } from '../../interfaces/user.interface';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
import { DROPDOWN_ANIMATIONS } from '../../app.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [...DROPDOWN_ANIMATIONS]
})
export class HeaderComponent implements OnInit, OnDestroy {

  toggleLink = false;
  toggleButton = false;

  currentUser: User;

  userMenu: NavItem[] = [
    {
      label: 'Wishlist',
      route: '/wishlist',
      icon: 'assets/images/icons/heart.svg'
    },
    {
      label: 'Cart',
      route: '/cart',
      icon: 'assets/images/icons/cart.svg'
    },
  ];

  profileMenu: NavItem[] = [
    {
      label: 'Profile',
      route: '/profile',
      icon: 'assets/images/icons/user.svg'
    },
    {
      label: 'Settings',
      route: '/settings',
      icon: ''
    },
  ];

  navItems: NavItem[] = [
    {
      label: 'Collection',
      route: '/collection',
    },
    {
      label: 'Women',
      route: '/collection/women',
    },
    {
      label: 'Men',
      route: '/collection/men',
    },
    {
      label: 'Sale',
      route: '/collection/sale',
    }
  ];

  private destroyedSubject = new Subject<void>();

  constructor(
    private r: Router,
    private us: UserService,
    // private as: AuthService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.us.currentUser;
    this.us
      .currentUser$
      .pipe(
        takeUntil(this.destroyedSubject)
      )
      .subscribe((newUser: User) => {
        this.currentUser = newUser;
      });
  }

  get userName(): string {
    return this.currentUser.FullName;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  logout(): void {
    this.us.logout();
    this.r.navigate(['/auth']);

    // this.as
    //   .logout()
    //   .subscribe(
    //     () => {
    //       this.us.logout();
    //       this.r.navigate(['/auth']);
    //     }
    //   );
  }



}
