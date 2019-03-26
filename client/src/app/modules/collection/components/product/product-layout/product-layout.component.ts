import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductDetailsLayoutClass } from '../../../classes/product-details-layout.class';
import { ProductsService } from '../../../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../../services/utils.service';
import { Observable } from 'rxjs';
import { Product } from '../../../../../interfaces/product/product.interface';
import { ObjectClass } from '../../../../../enums/object-class.enum';
import { DETAILS_ROUTE_ANIMATION } from '../../../../../app.animations';
import { DetailsPageLayoutService } from '../../../../../services/details-page-layout.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-product-layout',
  // templateUrl: '../../templates/product-details-layout.template.html',
  templateUrl: 'product-layout.component.html',
  animations: [ DETAILS_ROUTE_ANIMATION ]
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
