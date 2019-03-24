import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router/src/router';

import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { PaginationQueryPart } from '../interfaces/queries/pagination-query-part.interface';
import { BasicQueryModel } from '../models/basic-query.model';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService<T extends BasicQueryModel> {

  private querySubject = new Subject<T>();
  private _query: T;

  get query(): T {
    return this._query;
  }

  set query(query: T) {
    this._query = {
      limit: query.limit,
      page: query.page,
      ...query.queryParams,
    };
    this.querySubject.next(this._query);
  }

  get query$(): Observable<T> {
    return this.querySubject.asObservable();
  }

  get filters(): any {
    return this._query.queryParams;
  }

  // get tableSortPropDir(): SortPropDir[] {
  //   if (!this._query || !this._query.sorterFactoryParams) {
  //     return [];
  //   }
  //
  //   const sorterFactoryParamsOrder: SorterFactoryParamsOrder = this._query.sorterFactoryParams.orderBy[ 0 ];
  //
  //   const dirMap = {
  //     [ SortDirection.ASC ]: NgxSortDirection.asc,
  //     [ SortDirection.DESC ]: NgxSortDirection.desc
  //   };
  //
  //   return [
  //     {
  //       prop: Object.values(sorterFactoryParamsOrder)[ 0 ],
  //       dir: dirMap[ Object.keys(sorterFactoryParamsOrder)[ 0 ] ]
  //     }
  //   ];
  // }

  updateQueryParams(queryParams: any): void {
    const cleanQueryParams = {};

    // We need to cleanup empty string parameters
    Object
      .keys(queryParams)
      .forEach(attr => {
        if (typeof queryParams[attr] === 'string' && !queryParams[attr]) {
          return;
        }

        cleanQueryParams[attr] = queryParams[attr];
      });

    this._query.queryParams = cleanQueryParams;

    const queryToServer = {
      limit: this._query.limit,
      page: this._query.page,
      ...this._query.queryParams,
    };

    this.querySubject.next(queryToServer);
  }

  updatePaginationParams(paginationParams: PaginationQueryPart): void {
    this._query.limit = paginationParams.limit;
    this._query.page = paginationParams.page;

    const queryToServer = {
      limit: this._query.limit,
      page: this._query.page,
      ...this._query.queryParams,
    };

    this.querySubject.next(queryToServer);
  }

  /**
   * @param skipFields - Used to filter params from pasting them to url.
   */
  getParamsForUrl(skipFields: string[] = []): NavigationExtras {
    const cleanParams = {};
    const params: BasicQueryModel | any = {
      limit: this._query.limit,
      page: this._query.page,
      ...this._query.queryParams,
    };

    // if (this._query.sorterFactoryParams) {
    //   const sortParams = this._query.sorterFactoryParams.orderBy[ 0 ];
    //
    //   if (sortParams) {
    //     params.sortBy = Object.values(sortParams)[ 0 ];
    //     params.sortDirection = Object.keys(sortParams)[ 0 ];
    //   }
    // }

    Object
      .keys(params)
      .forEach(
        key => {
          if (
            (params[key] || (typeof params[key] === 'number' && isFinite(params[key])))
            && skipFields.indexOf(key) < 0
          ) {
            cleanParams[key] = params[key];
          }
        },
      );

    return { queryParams: cleanParams };
  }

  triggerChange(): void {
    this.querySubject.next(this._query);
  }

}
