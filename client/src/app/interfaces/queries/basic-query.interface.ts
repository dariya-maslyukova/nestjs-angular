import { QueryType } from '../../enums/query-type.enum';
import { PaginationQueryPart } from './pagination-query-part.interface';
import { SortQueryPart } from './sort-query-part.interface';

export interface BasicQuery extends SortQueryPart, PaginationQueryPart {
  queryType?: QueryType;
  queryParams?: any;
}
