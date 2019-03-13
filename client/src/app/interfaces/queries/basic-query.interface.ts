import { QueryType } from '../../enums/query-type.enum';

export interface BasicQuery {
  environment?: string;
  type?: QueryType;
  query?: any;
}
