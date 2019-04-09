import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../interfaces/nav/nav-item.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
