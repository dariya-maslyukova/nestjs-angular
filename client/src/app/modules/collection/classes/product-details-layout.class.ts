import { ChangeDetectorRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Toast, ToasterService } from 'angular2-toaster';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { concatMap, takeUntil } from 'rxjs/operators';


import { UtilsService } from '../../../services/utils.service';
import { ObjectClass } from '../../../enums/object-class.enum';
import { DetailsPageLayoutService } from '../../../services/details-page-layout.service';
import { CONFIG } from '../../../app.config';
import { Model } from '../../../interfaces/model.interface';
import { Product } from '../../../interfaces/product/product.interface';

export abstract class ProductDetailsLayoutClass implements OnInit, OnDestroy, OnChanges {

  destroyedSubject = new Subject<void>();
  isLoading;
  sectionName = '';
  sectionBackOption;

  @ViewChild('o') outlet: RouterOutlet;
  protected abstract objectClass: ObjectClass;

  protected constructor(
    protected ar: ActivatedRoute,
    protected r: Router,
    protected us: UtilsService,
    protected cdr: ChangeDetectorRef,
    protected dpls: DetailsPageLayoutService,
    protected ts: ToasterService
  ) {
  }

  abstract get isDataLoaded(): boolean;

  protected abstract get currSelectedItem(): Model;

  protected abstract set currSelectedItem(data: Model);

  ngOnChanges() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.dpls
      .isLoading$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
        // This is because of `ExpressionChangedAfterItHasBeenCheckedError`
        this.cdr.detectChanges();
      });

    this.processNavParams();
  }

  processNavParams(): void {
    let tmpParamsSKU: string;

    this.ar
      .params
      .pipe(
        concatMap(params => {
          this.currSelectedItem = null;
          this.dpls.isLoading = true;

          tmpParamsSKU = params.sku;
          return this.getDataFromAPI(params.sku);
        }),
        takeUntil(this.destroyedSubject)
      )
      .subscribe(
        (response: Product) => {
          if (!response) {
            const routesMap = {
              [ ObjectClass.WomenProducts ]: '/collection/women',
              [ ObjectClass.MenProducts ]: '/collection/men',
            };

            this.ts.pop(
              {
                type: 'error',
                body: CONFIG.infoMessages.itemNotFound,
                showCloseButton: true
              } as Toast
            );

            return this.r.navigate([ routesMap[ this.objectClass ] ]);
          }

          this.onGetResponse(tmpParamsSKU, response);
        }
      );
  }



  ngOnDestroy(): void {
    this.cleanupCurrentSelectedItem();
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getState(): string {
    return this.outlet ? this.outlet.activatedRouteData.state : '';
  }

  protected abstract getDataFromAPI(sku: string): Observable<Product>;

  protected abstract onGetResponse(rootObjectId: string, response: Product): void;

  protected abstract cleanupCurrentSelectedItem(): void;
}
