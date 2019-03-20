import { RangeResponse } from './range-response.interface';
import { Model } from './model.interface';

export interface DataResponse<T = Model> {
  response: T[];
  range: RangeResponse;
}
