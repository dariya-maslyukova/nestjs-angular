import { BasicQuery } from './basic-query.interface';

export interface HomeSliderQuery extends BasicQuery {
  query?: {
    id?: string | string[];
  };
}
