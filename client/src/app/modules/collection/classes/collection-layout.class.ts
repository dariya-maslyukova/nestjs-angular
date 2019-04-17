import { ChangeDetectorRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

import { UtilsService } from '../../../services/utils.service';
import { DetailsPageLayoutService } from '../../../services/details-page-layout.service';
import { ObjectClass } from '../../../enums/object-class.enum';
import { CategoryService } from '../../../services/category.service';
import { SidebarService } from '../../../services/sidebar.service';

export abstract class CollectionLayoutClass implements OnInit, OnDestroy, OnChanges {

  destroyedSubject = new Subject<void>();
  isLoading;

  @ViewChild('o') outlet: RouterOutlet;

  objectClass: ObjectClass;

  protected constructor(
    protected cs: CategoryService,
    protected ar: ActivatedRoute,
    protected r: Router,
    protected us: UtilsService,
    protected cdr: ChangeDetectorRef,
    protected dpls: DetailsPageLayoutService,
    protected sds: SidebarService,
  ) {
  }

  abstract get isDataLoaded(): boolean;

  abstract get isCategory(): boolean;

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.dpls
      .isLoading$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
        // This is because of `ExpressionChangedAfterItHasBeenCheckedError`
        this.cdr.detectChanges();
      });

    this.loadSidebar();

  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  getState(): string {
    return this.outlet ? this.outlet.activatedRouteData.state : '';
  }

  protected loadSidebar(): void {
    this.sds.isDisabled = false;
  }
}
