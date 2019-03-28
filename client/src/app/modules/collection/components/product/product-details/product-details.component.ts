import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product } from '../../../../../interfaces/product/product.interface';
import { DetailsPageLayoutService } from '../../../../../services/details-page-layout.service';
import { ProductsService } from '../../../../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product;
  private destroyedSubject = new Subject<void>();

  constructor(
    private ps: ProductsService,
    private dpls: DetailsPageLayoutService,
  ) {
  }

  ngOnInit() {
    // Responsible for first data display when details layout already has a record loaded
    this.loadProduct(this.ps.selectedProduct);
    console.log(this.ps.selectedProduct);

    // Responsible for case when we dynamically change selected item on the fly
    this.ps
      .selectedProduct$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(product => {
        this.dpls.isLoading = true;
        this.loadProduct(product);
      });
  }

  loadProduct(product: Product) {
    if (!product) {
      return;
    }

    this.product = product;
    this.dpls.isLoading = false;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
