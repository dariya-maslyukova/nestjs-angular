import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavItem } from '../../interfaces/nav/nav-item.interface';
import { User } from '../../interfaces/user.interface';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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

  navItems: NavItem[] = [
    {
      label: 'New',
      route: '/new',
    },
    {
      label: 'Women',
      route: '/women',
    },
    {
      label: 'Men',
      route: '/men',
    },
    {
      label: 'Sale',
      route: '/sale',
    }
  ];

  private destroyedSubject = new Subject<void>();

  constructor(
    private r: Router,
    private us: UserService,
    private as: AuthService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.us.currentUser;

    console.log(this.currentUser);

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
    return this.currentUser.fullName;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  logout(): void {
    this.as
      .logout()
      .subscribe(
        () => {
          this.us.logout();
          this.r.navigate(['/auth']);
        }
      );
  }



}
