import { ObjectClass } from '../../enums/object-class.enum';

export interface WishlistItem {
  objectClass: ObjectClass,
  sku: string;
  Name: string;
  Price: number;
  Image: string;
}
