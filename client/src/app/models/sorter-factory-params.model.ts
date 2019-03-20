import { SortQueryPart } from '../interfaces/queries/sort-query-part.interface';
import { SortDirection } from '../enums/sort-direction.enum';

export class SorterFactoryParamsModel implements SortQueryPart {
  sorterFactoryParams;

  constructor(params: any) {
    if (params && params.sortBy) {
      this.sorterFactoryParams = {
        orderBy: [
          {
            [ params.sortDirection ? params.sortDirection : SortDirection.ASC ]: params.sortBy
          }
        ]
      };
    }
  }

}
