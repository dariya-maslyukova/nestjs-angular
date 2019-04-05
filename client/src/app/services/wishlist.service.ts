import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { WishlistItem } from '../interfaces/wishlist/wishlist-item.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  wishlistProducts: WishlistItem[] = [];
  wishlistTotal = 0;

  private _wishlistItems: WishlistItem[] = [];
  private wishlistItemsSubject = new Subject<WishlistItem[]>();

  private _isAddedToWishlist = {};
  private isAddedToWishlistSubject = new Subject<object>();

  constructor() {
  }

  set wishlistItems(wishlistItems: WishlistItem[]) {
    this._wishlistItems = wishlistItems;
    this.wishlistItemsSubject.next(this._wishlistItems);
  }

  get wishlistItems(): WishlistItem[] {
    return this._wishlistItems;
  }

  initWishlist(item?: WishlistItem): void {

    if (item && item.sku) {

      if (localStorage.getItem('Wishlist') == null) {
        const wishlist: any = [];
        wishlist.push(JSON.stringify(item));
        localStorage.setItem('Wishlist', JSON.stringify(wishlist));
      } else {
        const wishlist: any = JSON.parse(localStorage.getItem('Wishlist'));
        let index = -1;

        for (let i = 0; i < wishlist.length; i++) {
          const wishlistItem = JSON.parse(wishlist[i]);

          if (wishlistItem.sku === item.sku) {
            index = i;
            break;
          }
        }

        if (index === -1) {
          wishlist.push(JSON.stringify(item));
          localStorage.setItem('Wishlist', JSON.stringify(wishlist));
          this.isAddedToWishlist[item.sku] = true;
        } else {

          if (index > -1) {
            wishlist.splice(index, 1);
            localStorage.setItem('Wishlist', JSON.stringify(wishlist));
            this.isAddedToWishlist[item.sku] = false;
          }
        }
      }
      this.loadWishlist();
    } else {
      this.loadWishlist();
    }
  }

  loadWishlist(): void {
    this.wishlistTotal = 0;
    this.wishlistProducts = [];
    const wishlist = JSON.parse(localStorage.getItem('Wishlist'));

    if (wishlist) {
      for (let i = 0; i < wishlist.length; i++) {
        const wishlistItem: WishlistItem = JSON.parse(wishlist[i]);
        this.isAddedToWishlist[wishlistItem.sku] = true;

        this.wishlistProducts.push({
          objectClass: wishlistItem.objectClass,
          sku: wishlistItem.sku,
          Name: wishlistItem.Name,
          Price: wishlistItem.Price,
          Image: wishlistItem.Image,
        });
      }
      this.wishlistTotal = this.wishlistProducts.length;
    }

    this.wishlistItems = this.wishlistProducts;
  }


  removeItemFromWishlist(sku: string): void {
    const wishlist: any = JSON.parse(localStorage.getItem('Wishlist'));

    for (let i = 0; i < wishlist.length; i++) {
      const wishlistItem: WishlistItem = JSON.parse(wishlist[i]);

      if (wishlistItem.sku === sku) {
        wishlist.splice(i, 1);
        this.isAddedToWishlist[wishlistItem.sku] = false;
        break;
      }
    }
    localStorage.setItem('Wishlist', JSON.stringify(wishlist));
    this.loadWishlist();
  }

  get wishlistItems$(): Observable<WishlistItem[]> {
    return this.wishlistItemsSubject.asObservable();
  }

  get isAddedToWishlist(): object {
    return this._isAddedToWishlist;
  }

  set isAddedToWishlist(wishlistItems: object) {
    this._isAddedToWishlist = wishlistItems;
    this.isAddedToWishlistSubject.next(this.isAddedToWishlistSubject);
  }

  get isAddedToWishlist$(): Observable<object> {
    return this.isAddedToWishlistSubject.asObservable();
  }

}
