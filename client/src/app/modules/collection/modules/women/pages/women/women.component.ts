import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { first, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../../../../interfaces/product/product.interface';
import { QueryParamsService } from '../../../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../../../models/products-query.model';
import { UtilsService } from '../../../../../../services/utils.service';
import { GridPage } from '../../../../classes/grid-page.class';
import { WishlistService } from '../../../../../../services/wishlist.service';
import { CategoryService } from '../../../../../../services/category.service';
import { Category } from '../../../../../../enums/category.enum';
import { ProductsFilters } from '../../../../../../interfaces/product/product-filters.interface';
import { PaginationQueryPart } from '../../../../../../interfaces/queries/pagination-query-part.interface';
import { DetailsPageLayoutService } from '../../../../../../services/details-page-layout.service';
import { DocsResponse } from '../../../../../../interfaces/docs-response.interface';
import { WishlistItem } from '../../../../../../interfaces/wishlist/wishlist-item.interface';
import { ObjectClass } from '../../../../../../enums/object-class.enum';

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
    category: Category.Women,
  };

  response: DocsResponse<Product[]>;
  isAddedToWishlist = {};

  constructor(
    qps: QueryParamsService<ProductsQueryModel>,
    private ws: WishlistService,
    private r: Router,
    private ar: ActivatedRoute,
    cs: CategoryService,
    private cdr: ChangeDetectorRef,
    private us: UtilsService,
    private dpls: DetailsPageLayoutService,
  ) {
    super(qps, cs);
  }


  ngOnInit() {
    this.cs.objectClass = ObjectClass.WomenProducts;
    /**
     * Order is important. We need to subscribe for query changes(filter and pagination will affect it)
     * And then model will create our query from url params and emit it to this observable
     */
    // TODO: add debounce in case when we switching pages(pagination) quickly, etc
    this.qps
      .query$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(() => {
        this.r.navigate(['/collection/women'], this.qps.getParamsForUrl());
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

    this.cs
      .selectedCategoryProducts$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(response => {
        this.loadCategory(response);
        this.cs.totalFoundProducts = response ? response.totalDocs : 0;
        this.cdr.markForCheck();

      });

    this.isAddedToWishlist = this.ws.isAddedToWishlist;
  }

  loadCategory(response: DocsResponse<Product[]>) {
    if (response) {
      this.response = response;
      this.dpls.isLoading = false;
    }
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

  getDetailsUrl(sku: string): string {
    return `/collection/women/product/${this.us.getProductSKU(sku)}`;
  }


}
