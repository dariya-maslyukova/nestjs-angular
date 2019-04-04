import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
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

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  cartTotal: number;
  isDisabled = true;

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
    this.cs.initCart();
    this.cartItems = this.cs.cartProducts;
    this.cartTotal = this.cs.cartTotal;

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
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.ds.toggleDropdown();
  }

  productSize(sizes: ProductSize[]): string {
    return sizes.map(size => `${size.Name} - ${size.Qty}`).join(', ');
  }

  productSizeCount(sizes: ProductSize[]): string {
    return sizes.map(size => `${size.Name} - ${size.Qty}`).join(', ');
  }

  removeItem(sku: string, color: string): void {
    this.cs.removeItemFromCart(sku, color);
    this.state = SidebarState.OPEN_EXPANDED;
  }

  countItems(): string {
    return this.cartItems.length > 1 ? `${this.cartItems.length} items` : `${this.cartItems.length} item`;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  onClose(): void {
    this.ds.close();
  }

  @HostListener('document:click', ['$event']) documentClick(event): void {
    if (!this.er.nativeElement.contains(event.target)) {
      this.ds.close();
    }
  }

}
