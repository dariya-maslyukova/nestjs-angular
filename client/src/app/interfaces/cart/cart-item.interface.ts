import { Product } from '../product/product.interface';
import { ProductSize } from '../product/product-size';

export interface CartItem {
  Color: string;
  Size: ProductSize[];
  Product: Product;
  Quantity?: number;
}
