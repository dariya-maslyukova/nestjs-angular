import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NavItem } from '../../interfaces/nav/nav-item.interface';
import { User } from '../../interfaces/user.interface';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Router, RouterOutlet } from '@angular/router';
import { DROPDOWN_ANIMATIONS } from '../../app.animations';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../interfaces/product/product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [...DROPDOWN_ANIMATIONS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

  toggleLink = false;
  toggleButton = false;

  currentUser: User;

  userMenu: NavItem[] = [
    {
      label: 'Wishlist',
      route: '/wishlist',
      icon: 'assets/images/icons/heart.svg',
      count: 0,
    },
    {
      label: 'Cart',
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
    protected cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.us.currentUser;

    this.us
      .currentUser$
      .pipe(
        takeUntil(this.destroyedSubject),
      )
      .subscribe((newUser: User) => {
        this.currentUser = newUser;
      });

    this.ws.wishlistProducts$
      .pipe(
        takeUntil(this.destroyedSubject),
      )
      .subscribe((wishlistProducts: Product[]) => {
        this.userMenu[0].count = wishlistProducts.length;
        this.cdr.detectChanges();
      });
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
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
