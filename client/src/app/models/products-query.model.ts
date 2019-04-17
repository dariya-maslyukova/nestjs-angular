import { BasicQueryModel } from './basic-query.model';
import { ProductsFilters } from '../interfaces/product/product-filters.interface';

export class ProductsQueryModel extends BasicQueryModel {
  queryParams?: ProductsFilters = {};

  constructor(params: any) {
    super(params);
    const attrs = [
      'parentCategory',
      'category',
      'size',
      'color'
    ];

    attrs.forEach(attr => {
      // All attrs from this model are strings
      this.queryParams[attr] = typeof params[attr] === 'string' ? params[attr] : '';
    });
  }
}
