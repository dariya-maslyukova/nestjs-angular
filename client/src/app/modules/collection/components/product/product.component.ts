import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductsService } from '../../../../services/products.service';
import { DetailsPageLayoutService } from '../../../../services/details-page-layout.service';
import { ModalService } from '../../../../services/modal.service';
import { ModalType } from '../../../../enums/modal-type.enum';
import { SelectOption } from '../../../../interfaces/select-option.interface';
import { Size } from '../../../../enums/size.enum';
import { Color } from '../../../../enums/color.enum';
import { UtilsService } from '../../../../services/utils.service';
import { CartItem } from '../../../../interfaces/cart/cart-item.interface';
import { Product } from '../../../../interfaces/product/product.interface';
import { CartService } from '../../../../services/cart.service';
import { WishlistService } from '../../../../services/wishlist.service';
import { WishlistItem } from '../../../../interfaces/wishlist/wishlist-item.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product;
  isLoading;
  isAddedToWishlist = {};

  colorOptions: SelectOption<Color>[] = [
    {
      value: Color.Black,
      label: 'Black',
    },
    {
      value: Color.White,
      label: 'White',
    },
  ];

  sizeOptions: SelectOption<Size>[] = [
    {
      value: Size.S,
      label: 'S',
    },
    {
      value: Size.M,
      label: 'M',
    },
    {
      value: Size.L,
      label: 'L',
    },
    {
      value: Size.XL,
      label: 'XL',
    },
  ];

  form: FormGroup;

  private destroyedSubject = new Subject<void>();

  constructor(
    private ps: ProductsService,
    private dpls: DetailsPageLayoutService,
    private ms: ModalService,
    private fb: FormBuilder,
    private us: UtilsService,
    private cs: CartService,
    private ws: WishlistService,
  ) {

    this.form = this.fb.group({
      Color: this.fb.group({
        Value: [this.colorOptions[0].value, Validators.required],
      }),
      Size: this.fb.group({
        Value: [null, Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.loadProduct(this.ps.selectedProduct);
    this.isAddedToWishlist = this.ws.isAddedToWishlist;

    this.ps
      .selectedProduct$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(() => {
        this.dpls.isLoading = false;
      });

    this.cs
      .cartItems$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe((cartRespone: CartItem[]) => {
        setTimeout(() => {
          this.isLoading = !cartRespone;
        }, 500);
      });
  }

  loadProduct(product: Product) {
    if (!product) {
      return;
    }
    this.product = product;
    this.dpls.isLoading = false;
  }

  addToWishlist(product: Product) {
    const wishlistItem: WishlistItem = {
      objectClass: product.objectClass,
      sku: product.sku,
      Name: product.name,
      Price: product.price,
      Image: product.baseImage,
    };

    this.ws.initWishlist(wishlistItem);
  }

  addToCart(): void {
    this.isLoading = true;

    if (!this.form.valid) {
      return this.us.validateAllFormFields(this.form);
    }

    const color = this.form.get('Color.Value');
    const size = this.form.get('Size.Value');

    const cartItem = {
      Size: [
        {
          Name: size.value,
          Qty: 1,
        },
      ],
      Color: color.value,
      Product: {
        objectClass: this.product.objectClass,
        sku: this.product.sku,
        name: this.product.name,
        price: this.product.price,
        baseImage: this.product.baseImage,
      },
    };

    this.cs.initCart(cartItem);
  }

  onValueChange(event, attr) {

  }

  openCarouselModal(images, slideId): void {
    this.ms.showModal(ModalType.CAROUSEL, { images, slideId });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }
}
