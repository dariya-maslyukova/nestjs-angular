import { Pipe, PipeTransform } from '@angular/core';
import { WishlistItem } from '../../interfaces/wishlist/wishlist-item.interface';
import { CartItem } from '../../interfaces/cart/cart-item.interface';

@Pipe({
  name: 'sliceArray',
})
export class SliceArrayPipe implements PipeTransform {

  transform(items: WishlistItem[] | CartItem[], end?: number): WishlistItem[] | CartItem[] {
    return items.slice(0, end ? end : 6);
  }

}
