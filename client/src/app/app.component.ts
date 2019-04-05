import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DropdownService } from './services/dropdown.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  isHomePage = false;

  constructor (
    private r: Router,
    private ds: DropdownService
  ) {

    r.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
      }
    });

  }

  ngOnInit(): void {
    this.ds.isDisabled = false;
  }
}
