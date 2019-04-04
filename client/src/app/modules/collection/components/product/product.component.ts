import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../interfaces/product/product.interface';
import { Subject } from 'rxjs';
import { ProductsService } from '../../../../services/products.service';
import { DetailsPageLayoutService } from '../../../../services/details-page-layout.service';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from '../../../../services/modal.service';
import { ModalType } from '../../../../enums/modal-type.enum';
import { SelectOption } from '../../../../interfaces/select-option.interface';
import { Size } from '../../../../enums/size.enum';
import { Color } from '../../../../enums/color.enum';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../../../services/utils.service';
import { CartItem } from '../../../../interfaces/cart/cart-item.interface';
import { CartItemModel } from '../../../../models/cart-item.model';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product;
  isLoading;

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
  error = '';

  private destroyedSubject = new Subject<void>();

  constructor(
    private ps: ProductsService,
    private dpls: DetailsPageLayoutService,
    private ms: ModalService,
    private fb: FormBuilder,
    private us: UtilsService,
    private cs: CartService,
  ) {

    this.form = this.fb.group({
      Color: this.fb.group({
        Value: [this.colorOptions[0].value, Validators.required],
      }),
      Size: this.fb.group({
        Value: [null, Validators.required],
      }),
      OrderItems: this.fb.array([]),
    });
  }

  ngOnInit() {

    // Responsible for first data display when details layout already has a record loaded
    this.loadProduct(this.ps.selectedProduct);
    // console.log(this.ps.selectedProduct);
    //
    // Responsible for case when we dynamically change selected item on the fly
    this.ps
      .selectedProduct$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(product => {

        this.dpls.isLoading = false;
        // this.loadProduct(product);
      });
  }

  loadProduct(product: Product) {
    if (!product) {
      return;
    }
    this.product = product;
    this.dpls.isLoading = false;
  }

  onOptionsCheckToCart(event, attr) {

  }

  addOptionsToCart(): void {
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
        sku: this.product.sku,
        name: this.product.name,
        price: this.product.price,
        baseImage: this.product.baseImage,
      },
    };

    this.cs.initCart(cartItem);

    const form = this.fb.group(
      {
        ...cartItem,
      });

    const orderItems = this.form.get('OrderItems') as FormArray;
    orderItems.push(form);
  }

  onSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.form.valid) {
      return this.us.validateAllFormFields(this.form);
    }

    this.saveOrUpdate();
  }

  saveOrUpdate(): void {
    this.isLoading = true;
  }

  openCarouselModal(images, slideId): void {
    this.ms.showModal(ModalType.CAROUSEL, { images, slideId });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }
}
