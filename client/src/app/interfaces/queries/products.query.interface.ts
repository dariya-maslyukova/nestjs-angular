import { BasicQuery } from './basic-query.interface';
import { ProductsFilters } from '../product/product-filters.interface';

export interface ProductsQuery extends BasicQuery {
  queryParams?: ProductsFilters;
}
