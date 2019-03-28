import { ChangeDetectorRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

import { UtilsService } from '../../../services/utils.service';
import { DetailsPageLayoutService } from '../../../services/details-page-layout.service';
import { SidebarState } from '../../../enums/sidebar-state.enum';
import { ObjectClass } from '../../../enums/object-class.enum';
import { FilterSidebarService } from '../../../services/filter-sidebar.service';
import { DocsResponse } from '../../../interfaces/docs-response.interface';
import { Product } from '../../../interfaces/product/product.interface';
import { NavItemGroup } from '../../../interfaces/nav/nav-item-group.interface';
import { CategoryService } from '../../../services/category.service';

export abstract class CollectionLayoutClass implements OnInit, OnDestroy, OnChanges {

  destroyedSubject = new Subject<void>();
  isLoading;
  sectionName = '';
  sectionDescription = '';

  @ViewChild('o') outlet: RouterOutlet;
  // protected abstract objectClass: ObjectClass;

  protected constructor(
    protected cs: CategoryService,
    protected ar: ActivatedRoute,
    protected r: Router,
    protected us: UtilsService,
    protected cdr: ChangeDetectorRef,
    protected dpls: DetailsPageLayoutService
  ) {
  }

  // abstract get isDataLoaded(): boolean;


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
        }
      );

    this.dpls
      .isLoading$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
        // This is because of `ExpressionChangedAfterItHasBeenCheckedError`
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getState(): string {
    return this.outlet ? this.outlet.activatedRouteData.state : '';
  }
  // protected abstract get itemLabel(): string;
  //
  // protected abstract getSidebarGroups(id: string): NavItemGroup[];
  //
  // protected setSidebarObjectClass(): void {
  //   this.cs.currentObjectClass = this.objectClass;
  // }

}
