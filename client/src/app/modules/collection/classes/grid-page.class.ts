import { NavigationExtras } from '@angular/router/src/router';
import { OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';

import { Subject } from 'rxjs';

import { QueryParamsService } from '../../../services/query-params.service';
import { BasicQueryModel } from '../../../models/basic-query.model';
import { Model } from '../../../interfaces/model.interface';
import { DocsResponse } from '../../../interfaces/docs-response.interface';
import { CategoryService } from '../../../services/category.service';
import { SidebarService } from '../../../services/sidebar.service';

export class GridPage<T, Q extends BasicQueryModel> implements OnDestroy {

  width: number;
  isLoading = false;
  response: DocsResponse<T[]> = {
    docs: [],
    limit: 32,
    page: 1,
  };
  selectedItems: Model[] = [];
  urlParams: any;

  protected destroyedSubject = new Subject<void>();

  constructor(
    protected qps: QueryParamsService<Q>,
    protected cs: CategoryService,
    protected ss: SidebarService,
  ) {
  }

  onItemsSelected({ selected }): void {
    this.selectedItems = selected;
  }

  getParamsForUrl(): NavigationExtras {
    const params = {};

    Object
      .keys(this.urlParams)
      .forEach(
        key => {
          if (this.urlParams[key] || typeof this.urlParams[key] === 'number') {
            params[key] = this.urlParams[key];
          }
        },
      );

    return { queryParams: params };
  }

  onPagerUpdate(paginationParams: MatPaginator): void {
    const limit = paginationParams.pageSize;
    const page = paginationParams.pageIndex + 1;
    this.qps.updatePaginationParams({ limit, page });
  }

  ngOnDestroy(): void {
    this.cs.totalFoundProducts = 0;
    this.cs.currCategoryCleanup();
    this.ss.sidebarCategories = null;
    this.ss.brands = [];
    this.ss.countries = [];

    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
