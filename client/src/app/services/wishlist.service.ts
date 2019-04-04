import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product/product.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private _wishlistProducts: Product[] = [];
  private wishlistProductsSubject = new Subject<Product[]>();

  private _isAddedToWishlist = {};
  private isAddedToWishlistSubject = new Subject<object>();

  constructor() {
  }

  set wishlistProducts(wishlistProducts: Product[]) {
    this._wishlistProducts = wishlistProducts;
    this.wishlistProductsSubject.next(this._wishlistProducts);
  }

  get wishlistProducts(): Product[] {
    return this._wishlistProducts;
  }

  addToWishlist(wishlistProduct: Product): void {
    const productIndex = this.wishlistProducts.findIndex((product: Product) => product.id === wishlistProduct.id);

    if (productIndex > -1) {
      const copy = this.wishlistProducts;
      copy.splice(productIndex, 1);
      this.isAddedToWishlist[wishlistProduct.id] = false;
    } else {
      this.wishlistProducts = this._wishlistProducts.concat([(wishlistProduct)]);
      this.isAddedToWishlist[wishlistProduct.id] = true;
    }

    this.wishlistProductsSubject.next(this._wishlistProducts);
  }

  deleteWishlistFrom(position: number): void {
    this.wishlistProducts.splice(position);
    this.wishlistProductsSubject.next(this._wishlistProducts);
  }

  get wishlistProducts$(): Observable<Product[]> {
    return this.wishlistProductsSubject.asObservable();
  }

  get isAddedToWishlist(): object {
    return this._isAddedToWishlist;
  }

  set isAddedToWishlist(wishlistProducts: object) {
    this._isAddedToWishlist = wishlistProducts;
    this.isAddedToWishlistSubject.next(this.isAddedToWishlistSubject);
  }

  get isAddedToWishlist$(): Observable<object> {
    return this.isAddedToWishlistSubject.asObservable();
  }

}
