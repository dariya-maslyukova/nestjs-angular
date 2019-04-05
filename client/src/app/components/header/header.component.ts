import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NavItem } from '../../interfaces/nav/nav-item.interface';
import { DROPDOWN_ANIMATIONS } from '../../app.animations';
import { WishlistService } from '../../services/wishlist.service';
import { DropdownService } from '../../services/dropdown.service';
import { CartItem } from '../../interfaces/cart/cart-item.interface';
import { CartService } from '../../services/cart.service';
import { DropdownType } from '../../enums/dropdown-type.enum';
import { WishlistItem } from '../../interfaces/wishlist/wishlist-item.interface';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [...DROPDOWN_ANIMATIONS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  toggleLink = false;
  toggleButton = false;

  currentUser: User;

  userMenu: NavItem[] = [
    {
      label: DropdownType.WISHLIST,
      route: '/wishlist',
      icon: 'assets/images/icons/heart.svg',
      count: 0,
    },
    {
      label: DropdownType.CART,
      route: '/cart',
      icon: 'assets/images/icons/cart.svg',
      count: 0,
    },
  ];

  profileMenu: NavItem[] = [
    {
      label: 'Profile',
      route: '/profile',
      icon: 'assets/images/icons/user.svg',
    },
    {
      label: 'Settings',
      route: '/settings',
      icon: '',
    },
  ];

  navItems: NavItem[] = [
    {
      label: 'Collection',
      route: '/collection/look',
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
    },
  ];

  private destroyedSubject = new Subject<void>();

  constructor(
    private r: Router,
    private us: UserService,
    private ws: WishlistService,
    private cdr: ChangeDetectorRef,
    private ds: DropdownService,
    private cs: CartService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.us.currentUser;

    this.us
      .currentUser$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe((newUser: User) => {
        this.currentUser = newUser;
      });

    this.ws.wishlistItems$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe((wishlistResponse: WishlistItem[]) => {
        this.userMenu[0].count = wishlistResponse.length;
        this.cdr.markForCheck();
      });

    this.cs
      .cartItems$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe((cartResponse: CartItem[]) => {
        this.userMenu[1].count = cartResponse.length;
        this.cdr.markForCheck();
      });
  }

  get userName(): string {
    return this.currentUser.FullName;
  }

  toggleDropdown(event, label?: DropdownType): void {
    event.stopPropagation();
    this.ds.toggleDropdown(label);
  }

  logout(): void {
    this.us.logout();
    this.r.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
