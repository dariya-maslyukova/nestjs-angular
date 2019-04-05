import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product/product.interface';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../interfaces/cart/cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartProducts: CartItem[] = [];
  cartTotal = 0;

  private _cartItem: CartItem;
  private _cartItemSubject = new Subject<CartItem>();

  private _cartItems: CartItem[] = [];
  private _cartItemsSubject = new Subject<CartItem[]>();

  constructor() {
  }

  set cartItem(cartItem: CartItem) {
    this._cartItem = cartItem;
    this._cartItemSubject.next(cartItem);
  }

  get cartItem(): CartItem {
    return this._cartItem;
  }

  get cartItem$(): Observable<CartItem> {
    return this._cartItemSubject.asObservable();
  }

  cartProductCleanup(): void {
    this.cartItem = null;
  }

  get cartItems(): CartItem[] {
    return this._cartItems;
  }

  set cartItems(cartItems: CartItem[]) {
    this._cartItems = cartItems;
    this._cartItemsSubject.next(cartItems);
  }

  get cartItems$(): Observable<CartItem[]> {
    return this._cartItemsSubject.asObservable();
  }


  initCart(item?) {
    if (item && item.Product.sku) {

      if (localStorage.getItem('Cart') == null) {
        const cart: any = [];
        cart.push(JSON.stringify(item));
        localStorage.setItem('Cart', JSON.stringify(cart));
      } else {
        const cart: any = JSON.parse(localStorage.getItem('Cart'));

        let index = -1;

        for (let i = 0; i < cart.length; i++) {
          const cartItem: CartItem = JSON.parse(cart[i]);

          if ((cartItem.Product.sku === item.Product.sku && cartItem.Color === item.Color)) {
            index = i;
            break;
          }
        }

        if (index === -1) {
          cart.push(JSON.stringify(item));
          localStorage.setItem('Cart', JSON.stringify(cart));
        } else {
          const cartItem: CartItem = JSON.parse(cart[index]);

          const findIndex = cartItem.Size.findIndex(size => size.Name === item.Size[0].Name);

          if (findIndex > -1) {
            cartItem.Size.map(size => {
              if (size.Name === item.Size[0].Name) {
                size.Qty += 1;
              }
            });
          }

          if (findIndex === -1) {
            cartItem.Size.push(item.Size[0]);
          }

          cart[index] = JSON.stringify(cartItem);
          localStorage.setItem('Cart', JSON.stringify(cart));
        }
      }
      this.loadCart();
    } else {
      this.loadCart();
    }
  }


  loadCart(): void {
    this.cartTotal = 0;
    this.cartProducts = [];
    const cart = JSON.parse(localStorage.getItem('Cart'));

    if (cart) {
      for (let i = 0; i < cart.length; i++) {

        const cartItem: CartItem = JSON.parse(cart[i]);
        this.cartProducts.push({
          Size: cartItem.Size,
          Color: cartItem.Color,
          Product: cartItem.Product,
        });

        this.cartTotal += cartItem.Product.price * (cartItem.Size
            .map(size => size.Qty)
            .reduce((acc, val) => acc + val, 0)
        );
      }
    }


    this.cartItems = this.cartProducts;
  }

  removeItemFromCart(sku: string, color: string): void {
    const cart: any = JSON.parse(localStorage.getItem('Cart'));

    for (let i = 0; i < cart.length; i++) {
      const cartItem: CartItem = JSON.parse(cart[i]);

      if (cartItem.Product.sku === sku && cartItem.Color === color) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('Cart', JSON.stringify(cart));
    this.loadCart();
  }

}
