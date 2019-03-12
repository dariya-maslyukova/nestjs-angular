import { Component, OnInit } from '@angular/core';
import { MAIN_ROUTE_ANIMATION } from '../../app.animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  animations: [ MAIN_ROUTE_ANIMATION ]
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
