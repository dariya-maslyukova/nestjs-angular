import { Product } from '../product/product.interface';

export interface CartProduct {
 product: string | Product;
 quantity: number;
}
