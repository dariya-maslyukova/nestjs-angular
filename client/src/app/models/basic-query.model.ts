import { BasicQuery } from '../interfaces/queries/basic-query.interface';
import { SorterFactoryParams } from '../interfaces/sorter-factory-params.interface';
import { SorterFactoryParamsModel } from './sorter-factory-params.model';

export class BasicQueryModel implements BasicQuery {
  queryParams?: any;
  // Attribute to fetch related data
  // assocs?: AssocQueryTypes[];
  /* tslint:disable variable-name */
  resultsFrom?: number;
  resultsTo?: number;
  sorterFactoryParams: SorterFactoryParams;

  /* tslint:enable variable-name */

  constructor(params: any) {
    const attrs = [
      'ResultsFrom',
      'ResultsTo'
    ];

    const sortParams = new SorterFactoryParamsModel(params);

    this.sorterFactoryParams = sortParams.sorterFactoryParams;

    attrs.forEach(attr => {
      if (typeof params[ attr ] === 'string' || typeof params[ attr ] === 'number') {
        this[ attr ] = parseInt(params[ attr ], 10);
      }
    });
  }
}
