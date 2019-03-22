import { PaginationQueryPart } from './pagination-query-part.interface';
import { SortQueryPart } from './sort-query-part.interface';

export interface BasicQuery extends SortQueryPart, PaginationQueryPart {
  query?: any;
}
