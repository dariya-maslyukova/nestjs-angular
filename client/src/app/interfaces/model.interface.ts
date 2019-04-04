import { ObjectClass } from '../enums/object-class.enum';

export interface Model {
  id?: string;
  objectClass?: ObjectClass;

  readonly createdAt?: string;
  readonly updatedAt?: string;
}
