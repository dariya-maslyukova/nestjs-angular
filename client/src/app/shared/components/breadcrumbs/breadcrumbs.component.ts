import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, PRIMARY_OUTLET } from '@angular/router';
import { Breadcrumb } from '../../../interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];

  constructor(
    private ar: ActivatedRoute,
    private r: Router,
  ) {
  }

  ngOnInit(): void {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    //
    // // subscribe to the NavigationEnd event
    this.r.events.subscribe(event => {
      // set breadcrumbs
      if (event instanceof NavigationEnd) {
        const root: ActivatedRoute = this.ar.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      }
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    // get the child routes
    const children: ActivatedRoute[] = route.children;


    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      console.log(child.snapshot);

      // get the route's URL segment
      const routeURL = child.snapshot.url.map(segment => {
        return `${(segment.path)}/`;
      });
      // append route URL to URL
      url += `${routeURL}`;

      // add breadcrumb
      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url,
      };
      breadcrumbs.push(breadcrumb);
      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    // we should never get here, but just in case
    return breadcrumbs;
  }

}
