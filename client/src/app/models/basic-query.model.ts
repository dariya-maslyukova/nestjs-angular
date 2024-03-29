import { BasicQuery } from '../interfaces/queries/basic-query.interface';

export class BasicQueryModel implements BasicQuery {
  queryParams?: any;
  limit?: number;
  page?: number;
  parentCategory?: string;

  /* tslint:enable variable-name */

  constructor(params: any) {
    const attrs = [
      'limit',
      'page',
      'parentCategory'
    ];

    attrs.forEach(attr => {
      if (typeof params[ attr ] === 'string' || typeof params[ attr ] === 'number') {
        this[ attr ] = parseInt(params[ attr ], 10);
      }
    });
  }
}
