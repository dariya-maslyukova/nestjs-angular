import { BasicQuery } from './basic-query.interface';
import { ProductsFilter } from '../products-filter.interface';

export interface ProductsQuery extends BasicQuery {
  query?: ProductsFilter;
}
