import { BasicQueryModel } from './basic-query.model';
import { ProductsFilter } from '../interfaces/products-filter.interface';

export class ProductsQueryModel extends BasicQueryModel {
  query?: ProductsFilter = {};

  constructor(params: any) {
    super(params);
    const attrs = [
      'Category',
      'Size',
      'Color'
    ];

    attrs.forEach(attr => {
      // All attrs from this model are strings
      this.query[attr] = typeof params[attr] === 'string' ? params[attr] : '';
    });
  }
}
