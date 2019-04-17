import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import { SidebarState } from '../../../enums/sidebar-state.enum';
import { SidebarMode } from '../../../enums/sidebar-mode.enum';
import { ModalService } from '../../../services/modal.service';
import { DetailsPageLayoutService } from '../../../services/details-page-layout.service';
import { WindowResizeService } from '../../../services/window-resize.service';
import { DropdownService } from '../../../services/dropdown.service';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../interfaces/cart/cart-item.interface';
import { ProductSize } from '../../../interfaces/product/product-size';
import { WishlistService } from '../../../services/wishlist.service';
import { UtilsService } from '../../../services/utils.service';
import { ObjectClass } from '../../../enums/object-class.enum';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  wishlistItems = [];
  cartTotal: number;
  isDisabled = true;
  isDropdownShowCart = false;
  isDropdownShowWishlist = false;

  private destroyedSubject = new Subject<void>();
  private state: SidebarState;
  private mode: SidebarMode;

  constructor(
    private ds: DropdownService,
    private er: ElementRef,
    private r: Router,
    private ms: ModalService,
    private wrs: WindowResizeService,
    private dpls: DetailsPageLayoutService,
    private cdr: ChangeDetectorRef,
    private cs: CartService,
    private ws: WishlistService,
    private us: UtilsService,
  ) {

  }

  get dropdownClasses(): object {
    return {
      'dropdown--open': this.state === SidebarState.OPEN_EXPANDED,
      'dropdown--collapsed': this.mode === SidebarMode.INLINE &&
        this.state === SidebarState.CLOSED_COLLAPSED,
    };
  }

  ngOnInit(): void {
    this.cs.loadCart();
    this.cartItems = this.cs.cartProducts;
    this.cartTotal = this.cs.cartTotal;

    this.ws.loadWishlist();
    this.wishlistItems = this.ws.wishlistProducts;

    this.ds
      .mode$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(mode => {
        this.mode = mode;
        this.cdr.markForCheck();
      });

    this.ds
      .state$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(state => {
        this.isDisabled = state === SidebarState.CLOSED_COLLAPSED;
        this.state = state;
        this.isDropdownShowCart = this.ds.isDropdownShowCart;
        this.isDropdownShowWishlist = this.ds.isDropdownShowWishlist;
        this.cdr.markForCheck();
      });


    this.cs
      .cartItems$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe((cartRespone: CartItem[]) => {
        this.cartItems = cartRespone;
        this.cartTotal = this.cs.cartTotal;
        this.cdr.markForCheck();
      });

    this.ws
      .wishlistItems$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe((wishlistRespone) => {
        this.wishlistItems = wishlistRespone;
        this.cdr.markForCheck();
      });
  }

  getDetailsUrl(objectClass: ObjectClass, sku: string) {
    const routesMap = {
      [ObjectClass.WomenProducts]: '/collection/women/product',
      [ObjectClass.MenProducts]: '/collection/men/product',
    };
    this.ds.close();

    const mapUrl = routesMap[objectClass];
    return `${mapUrl}/${this.us.getProductSKU(sku)}`;
  }

  productSize(sizes: ProductSize[]): string {
    return sizes.map(size => `${size.Name} - ${size.Qty}`).join(', ');
  }

  removeItemFromCart(sku: string, color: string): void {
    this.cs.removeItemFromCart(sku, color);
    this.ds.open();

  }

  removeItemFromWishlist(sku: string): void {
    this.ws.removeItemFromWishlist(sku);
    this.ds.open();
  }

  countItems(): string {
    if (this.isDropdownShowCart) {
      return this.cartItems.length > 1 ? `${this.cartItems.length} items` : `${this.cartItems.length} item`;
    }

    if (this.isDropdownShowWishlist) {
      return this.wishlistItems.length > 1 ? `${this.wishlistItems.length} items` : `${this.wishlistItems.length} item`;
    }
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  onClose(): void {
    this.ds.close();
  }

}
