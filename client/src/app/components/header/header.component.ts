import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../interfaces/nav/nav-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  userMenu: NavItem[] = [
    {
      label: 'Sign In/Register',
      route: '/auth',
      // icon: 'assets/img/icons/setup.svg'
    },
    {
      label: 'Wishlist',
      route: '/wishlist',
      // icon: 'assets/img/icons/settings.svg'
    }
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
    },
    {
      label: 'Contact',
      route: '/contact',
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
