import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaginationQueryPart } from '../../../../../../../interfaces/queries/pagination-query-part.interface';
import { ProductsFilters } from '../../../../../../../interfaces/product/product-filters.interface';
import { DocsResponse } from '../../../../../../../interfaces/docs-response.interface';
import { Product } from '../../../../../../../interfaces/product/product.interface';
import { QueryParamsService } from '../../../../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../../../../models/products-query.model';
import { CategoryService } from '../../../../../../../services/category.service';
import { WishlistService } from '../../../../../../../services/wishlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../../../../services/utils.service';
import { DetailsPageLayoutService } from '../../../../../../../services/details-page-layout.service';
import { ObjectClass } from '../../../../../../../enums/object-class.enum';
import { takeUntil } from 'rxjs/operators';
import { WishlistItem } from '../../../../../../../interfaces/wishlist/wishlist-item.interface';
import { GridPage } from '../../../../../classes/grid-page.class';
import { Categories } from '../../../../../../../enums/categories.enum';
import { SidebarService } from '../../../../../../../services/sidebar.service';
import { ProductsQuery } from '../../../../../../../interfaces/queries/products.query.interface';
import { SubCategories } from '../../../../../../../enums/sub-categories.enum';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenComponent extends GridPage<Product, ProductsQueryModel> implements OnInit {

  // Initial default params
  // TODO: move default pagination params to app's config?
  urlParams: PaginationQueryPart & ProductsFilters = {
    limit: 32,
    page: 1,
    category: Categories.Men,
  };

  response: DocsResponse<Product[]>;
  isAddedToWishlist = {};

  constructor(
    qps: QueryParamsService<ProductsQueryModel>,
    cs: CategoryService,
    ss: SidebarService,
    private ws: WishlistService,
    private r: Router,
    private ar: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private us: UtilsService,
    private dpls: DetailsPageLayoutService,
  ) {
    super(qps, cs, ss);
  }


  ngOnInit() {
    this.cs.objectClass = ObjectClass.MenProducts;
    /**
     * Order is important. We need to subscribe for query changes(filter and pagination will affect it)
     * And then model will create our query from url params and emit it to this observable
     */
    // TODO: add debounce in case when we switching pages(pagination) quickly, etc
    this.qps
      .query$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(query => {
        this.r.navigate(['/collection/men'], this.qps.getParamsForUrl());
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
        // first(),
        takeUntil(this.destroyedSubject),
      )
      .subscribe(params => {
        this.qps.query = new ProductsQueryModel({ ...this.urlParams, ...params });
      });

    this.isAddedToWishlist = this.ws.isAddedToWishlist;
  }


  getData(query: ProductsQuery): void {

    this.cs.getList(query)
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(response => {
        if (response) {
          this.response = response;

          this.cs.selectedCategoryProducts = this.response;
          this.cs.totalFoundProducts = this.response.totalDocs;
          this.ss.sidebarCategories = this.response.docs.map(products => products.categories)[0] as SubCategories[];
        }
        this.dpls.isLoading = false;
        this.cdr.markForCheck();
      });

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
    return `/collection/men/product/${this.us.getProductSKU(sku)}`;
  }

}
