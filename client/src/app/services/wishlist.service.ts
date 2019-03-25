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

  private _queryPath: string[] = [];

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
      this._isAddedToWishlist[wishlistProduct.id] = false;
    } else {
      this.wishlistProducts = this._wishlistProducts.concat([(wishlistProduct)]);
      this._isAddedToWishlist[wishlistProduct.id] = true;
    }

    this.wishlistProductsSubject.next(this._wishlistProducts);
    this.isAddedToWishlistSubject.next(this._isAddedToWishlist);
  }

  deleteWishlistFrom(position: number): void {
    this.queryPath.splice(position);
    this.wishlistProducts.splice(position);
    this.wishlistProductsSubject.next(this._wishlistProducts);
  }

  get wishlistProducts$(): Observable<Product[]> {
    return this.wishlistProductsSubject.asObservable();
  }

  get queryPath(): string[] {
    return this._queryPath;
  }

  set queryPath(productId: string[]) {
    this._queryPath = this._queryPath.concat(productId);
  }

  get isAddedToWishlist(): object {
    return this._isAddedToWishlist;
  }

}
