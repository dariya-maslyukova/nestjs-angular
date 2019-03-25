import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product/product.interface';
import { Observable, Subject } from 'rxjs';
import { CartProduct } from '../interfaces/cart/cart-product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartItems: CartProduct[] = [];
  private cartTotal = 0;

  private _cartProduct: Product;
  private cartProductSubject = new Subject<Product>();

  constructor() {
  }

  set cartProduct(product: Product) {
    this._cartProduct = product;
    this.cartProductSubject.next(product);
  }

  get cartProduct(): Product {
    return this._cartProduct;
  }

  get cartProduct$(): Observable<Product> {
    return this.cartProductSubject.asObservable();
  }

  cartProductCleanup(): void {
    this.cartProduct = null;
  }

  // initCart () {
  //   if (id) {
  //     var item: CartProduct = {
  //       product: this.productService.find(id),
  //       quantity: 1
  //     };
  //     if (localStorage.getItem('cart') == null) {
  //       let cart: any = [];
  //       cart.push(JSON.stringify(item));
  //       localStorage.setItem('cart', JSON.stringify(cart));
  //     } else {
  //       let cart: any = JSON.parse(localStorage.getItem('cart'));
  //       let index: number = -1;
  //       for (var i = 0; i < cart.length; i++) {
  //         let item: Item = JSON.parse(cart[i]);
  //         if (item.product.id == id) {
  //           index = i;
  //           break;
  //         }
  //       }
  //       if (index == -1) {
  //         cart.push(JSON.stringify(item));
  //         localStorage.setItem('cart', JSON.stringify(cart));
  //       } else {
  //         let item: Item = JSON.parse(cart[index]);
  //         item.quantity += 1;
  //         cart[index] = JSON.stringify(item);
  //         localStorage.setItem("cart", JSON.stringify(cart));
  //       }
  //     }
  //     this.loadCart();
  //   } else {
  //     this.loadCart();
  //   }
  // }


  loadCart(): void {
    this.cartTotal = 0;
    this.cartItems = [];
    const cart = JSON.parse(localStorage.getItem('cart'));

    for (let i = 0; i < cart.length; i++) {
      const item = JSON.parse(cart[i]);
      this.cartItems.push({
        product: item.product,
        quantity: item.quantity,
      });
      this.cartTotal += item.product.price * item.quantity;
    }
  }

  remove(id: string): void {
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    const index = -1;
    for (let i = 0; i < cart.length; i++) {
      const item: CartProduct = JSON.parse(cart[i]);
      // if (item.product.id == id) {
      //   cart.splice(i, 1);
      //   break;
      // }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

}
