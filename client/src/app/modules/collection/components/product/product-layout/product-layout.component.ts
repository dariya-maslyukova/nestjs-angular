import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs';

import { ProductDetailsLayoutClass } from '../../../classes/product-details-layout.class';
import { ProductsService } from '../../../../../services/products.service';
import { UtilsService } from '../../../../../services/utils.service';
import { Product } from '../../../../../interfaces/product/product.interface';
import { ObjectClass } from '../../../../../enums/object-class.enum';
import { DetailsPageLayoutService } from '../../../../../services/details-page-layout.service';

@Component({
  selector: 'app-product-layout',
  templateUrl: './product-layout.component.html',
})
export class ProductLayoutComponent extends ProductDetailsLayoutClass {

  objectClass = ObjectClass.WomenProducts;

  constructor(
    private ps: ProductsService,
    us: UtilsService,
    ar: ActivatedRoute,
    r: Router,
    cdr: ChangeDetectorRef,
    dpls: DetailsPageLayoutService,
    ts: ToasterService
  ) {
    super(ar, r, us, cdr, dpls, ts);
  }

  get isDataLoaded(): boolean {
    return !!this.ps.selectedProduct;
  }

  protected get currSelectedItem(): Product {
    return this.ps.selectedProduct;
  }

  protected set currSelectedItem(product: Product) {
    this.ps.selectedProduct = product;
  }

  protected getDataFromAPI(sku: string): Observable<Product> {
    return this.ps.getBySKU(sku);
  }

  protected onGetResponse(rootObjectId: string, response: Product): void {
    this.ps.selectedProduct = response;
  }

  protected cleanupCurrentSelectedItem(): void {
    this.ps.currProductCleanup();
  }

}
