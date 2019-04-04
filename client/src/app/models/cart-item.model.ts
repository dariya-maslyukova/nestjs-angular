import { BaseModel } from './base.model';
import { ObjectClass } from '../enums/object-class.enum';
import { CartItem } from '../interfaces/cart/cart-item.interface';

/* tslint:disable variable-name */
export class CartItemModel extends BaseModel implements CartItem {
  objectClass = ObjectClass.Cart;
  Color = null;
  Size = null;
  Product = null;

  constructor(data: CartItem = {} as CartItem) {
    super();
    super.fillProps(this, data);
  }
}
/* tslint:enable variable-name */
