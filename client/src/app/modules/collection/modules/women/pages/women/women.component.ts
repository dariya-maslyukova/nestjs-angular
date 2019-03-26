import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { first, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../../../interfaces/product/product.interface';
import { QueryParamsService } from '../../../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../../../models/products-query.model';
import { PaginationQueryPart } from '../../../../../../interfaces/queries/pagination-query-part.interface';
import { ProductsQuery } from '../../../../../../interfaces/queries/products.query.interface';
import { ProductsService } from '../../../../../../services/products.service';
import { ProductsFilters } from '../../../../../../interfaces/product/product-filters.interface';
import { UtilsService } from '../../../../../../services/utils.service';
import { GridPage } from '../../../../classes/grid-page.class';
import { WishlistService } from '../../../../../../services/wishlist.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WomenComponent extends GridPage<Product, ProductsQueryModel> implements OnInit {

  // Initial default params
  // TODO: move default pagination params to app's config?
  urlParams: PaginationQueryPart & ProductsFilters = {
    limit: 32,
    page: 1,
  };

  isAddedToWishlist = {};

  constructor(
    qps: QueryParamsService<ProductsQueryModel>,
    private ws: WishlistService,
    private r: Router,
    private ar: ActivatedRoute,
    private ps: ProductsService,
    private cdr: ChangeDetectorRef,
    private us: UtilsService,
  ) {
    super(qps);
  }


  ngOnInit() {
    /**
     * Order is important. We need to subscribe for query changes(filter and pagination will affect it)
     * And then model will create our query from url params and emit it to this observable
     */
    // TODO: add debounce in case when we switching pages(pagination) quickly, etc
    this.qps
      .query$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(query => {
        this.r.navigate(['/collection/women'], this.qps.getParamsForUrl());
        this.isLoading = true;
        this.getData(query);
      });

    /**
     * We need just the FIRST value from this observable.
     * I mean page loaded -> url params we got and then relax,
     * take it easy and just let QueryParamsService do its job :)
     */
    this.ar
      .queryParams
      .pipe(
        first(),
        takeUntil(this.destroyedSubject),
      )
      .subscribe(params => {
        this.qps.query = new ProductsQueryModel({ ...this.urlParams, ...params });
      });

    this.isAddedToWishlist = this.ws.isAddedToWishlist;
  }

  getData(query: ProductsQuery): void {

    this.ps.getList(query)
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(response => {
        this.response = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      });

  }

  get products(): Product[] {
    return (this.response.docs || []);
  }

  addToWishlist(product) {
    this.ws.addToWishlist(product);
  }

  getDetailsUrl(product: Product): string {
    return `/collection/women/product/${this.us.getProductSKU(product)}`;
  }


}
