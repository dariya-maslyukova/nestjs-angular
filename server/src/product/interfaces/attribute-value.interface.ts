import { ModelAttrValue } from './model-attr-value.interface';

export interface AttributeValue<T = ModelAttrValue> {
  [key: string]: T;
}
