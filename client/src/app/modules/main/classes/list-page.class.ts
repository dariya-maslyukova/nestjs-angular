import { NavigationExtras } from '@angular/router/src/router';
import { OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { PaginationQueryPart } from '../../../interfaces/queries/pagination-query-part.interface';
import { QueryParamsService } from '../../../services/query-params.service';
import { BasicQueryModel } from '../../../models/basic-query.model';
import { Model } from '../../../interfaces/model.interface';
import { DataResponse } from '../../../interfaces/data-response.interface';

export class ListPage<T, Q extends BasicQueryModel> implements OnDestroy {

  width: number;
  isLoading = false;
  data: DataResponse<T> = {
    response: [],
    range: {
      resultsFrom: 0,
      resultsTo: 0,
      totalLength: 0
    },
  };
  selectedItems: Model[] = [];
  urlParams: any;

  protected destroyedSubject = new Subject<void>();

  constructor(protected qps: QueryParamsService<Q>) {
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
          if (this.urlParams[ key ] || typeof this.urlParams[ key ] === 'number') {
            params[ key ] = this.urlParams[ key ];
          }
        }
      );

    return { queryParams: params };
  }

  onPagerUpdate(paginationParams: PaginationQueryPart): void {
    this.qps.updatePaginationParams(paginationParams);
  }

  // onSort(event: DatatableSortEvent): void {
  //   const sortPropDir = event.sorts[ 0 ];
  //
  //   if (sortPropDir) {
  //     this.qps.updateSortParams(sortPropDir);
  //   }
  // }

  // get tableSortPropDir(): SortPropDir[] {
  //   return this.qps.tableSortPropDir;
  // }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
