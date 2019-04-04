import { ChangeDetectorRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { concatMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';

import { UtilsService } from '../../../services/utils.service';
import { DetailsPageLayoutService } from '../../../services/details-page-layout.service';
import { ObjectClass } from '../../../enums/object-class.enum';
import { DocsResponse } from '../../../interfaces/docs-response.interface';
import { Product } from '../../../interfaces/product/product.interface';
import { CategoryService } from '../../../services/category.service';
import { ProductsQuery } from '../../../interfaces/queries/products.query.interface';
import { SidebarService } from '../../../services/sidebar.service';
import { Model } from '../../../interfaces/model.interface';

export abstract class CollectionLayoutClass implements OnInit, OnDestroy, OnChanges {

  destroyedSubject = new Subject<void>();
  isLoading;
  sectionName = '';

  @ViewChild('o') outlet: RouterOutlet;

  objectClass: ObjectClass;

  protected constructor(
    protected cs: CategoryService,
    protected ar: ActivatedRoute,
    protected r: Router,
    protected us: UtilsService,
    protected cdr: ChangeDetectorRef,
    protected dpls: DetailsPageLayoutService,
    protected sds: SidebarService
  ) {
  }

  abstract get isDataLoaded(): boolean;

  abstract get isCategory(): boolean;

  protected abstract get currSelectedCategory(): DocsResponse<Model[]>;

  protected abstract set currSelectedCategory(data: DocsResponse<Model[]>);

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.cs
      .currentSectionName$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(
        sectionName => {
          this.sectionName = sectionName;
          this.cdr.detectChanges();
        },
      );

    this.dpls
      .isLoading$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
        // This is because of `ExpressionChangedAfterItHasBeenCheckedError`
        this.cdr.detectChanges();
      });

    this.processNavParams();
    this.loadSidebar();
  }

  processNavParams(): void {

    this.ar
      .queryParams
      .pipe(
        concatMap(params => {
          this.currSelectedCategory = null;
          this.dpls.isLoading = true;
          return this.getDataFromAPI(params);
        }),
        takeUntil(this.destroyedSubject),
      )
      .subscribe((response: DocsResponse<Product[]>) => {
        this.cs.totalFoundProducts = response.totalDocs;
        this.onGetResponse(response);
      });
  }

  ngOnDestroy(): void {
    this.cleanupCurrentSelectedCategory();

    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getState(): string {
    return this.outlet ? this.outlet.activatedRouteData.state : '';
  }

  protected abstract cleanupCurrentSelectedCategory(): void;

  protected abstract onGetResponse(response: DocsResponse<Product[]>): void;

  protected abstract getDataFromAPI(query: ProductsQuery): Observable<DocsResponse<any>>;

  protected loadSidebar(): void {
    this.sds.isDisabled = false;
  }
}
