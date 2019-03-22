import { Component } from '@angular/core';
import { MAIN_ROUTE_ANIMATION } from '../../app.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './collection-layout.component.html',
  animations: [ MAIN_ROUTE_ANIMATION ]
})
export class CollectionLayoutComponent {

  getState(outlet: RouterOutlet): string {
    return outlet.activatedRouteData.state;
  }
}
