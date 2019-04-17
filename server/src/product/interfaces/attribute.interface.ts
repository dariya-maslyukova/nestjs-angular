import { AttributeValue } from './attribute-value.interface';

export interface Attribute {
  attributeName: string;
  attributeType: string;
  attributeId: string;
  values: AttributeValue[];
}
