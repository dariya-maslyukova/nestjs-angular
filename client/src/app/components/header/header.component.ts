import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../interfaces/nav/nav-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  toggleLink = false;
  toggleButton = false;

  userMenu: NavItem[] = [
    {
      label: 'My Account',
      route: '/auth',
      icon: 'assets/images/icons/user.svg'
    },
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

  constructor() {
  }

  ngOnInit() {
  }

}
