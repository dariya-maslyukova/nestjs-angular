import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { SidebarService } from '../../services/sidebar.service';
import { SidebarState } from '../../enums/sidebar-state.enum';
import { DetailsPageLayoutService } from '../../services/details-page-layout.service';
import { UtilsService } from '../../services/utils.service';
import { CollectionLayoutClass } from '../../modules/collection/classes/collection-layout.class';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../interfaces/product/product.interface';
import { ProductsQuery } from '../../interfaces/queries/products.query.interface';
import { DocsResponse } from '../../interfaces/docs-response.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-collection-layout',
  templateUrl: './collection-layout.component.html',
})
export class CollectionLayoutComponent extends CollectionLayoutClass implements OnInit {

  constructor(
    private ps: ProductsService,
    cs: CategoryService,
    ar: ActivatedRoute,
    r: Router,
    us: UtilsService,
    cdr: ChangeDetectorRef,
    dpls: DetailsPageLayoutService,
    sds: SidebarService,
  ) {
    super(cs, ar, r, us, cdr, dpls, sds);
  }

  get isSidebarCollapsed(): boolean {
    return this.sds.state === SidebarState.CLOSED_COLLAPSED;
  }

  get isDataLoaded(): boolean {
    return !!this.cs.selectedCategoryProducts;
  }

  get isCategory(): boolean {
    return !this.ps.selectedProduct;
  }

  protected get currSelectedCategory(): DocsResponse<Product[]> {
    return this.cs.selectedCategoryProducts;
  }

  protected set currSelectedCategory(products: DocsResponse<Product[]>) {
    this.cs.selectedCategoryProducts = products;
  }


  protected onGetResponse(response: DocsResponse<Product[]>): void {
    this.cs.selectedCategoryProducts = response;
  }

  protected getDataFromAPI(query: ProductsQuery): Observable<DocsResponse<Product[]>> {
    return this.cs.getList(query);
  }

  protected cleanupCurrentSelectedCategory(): void {
    this.cs.currCategoryCleanup();
  }


}
