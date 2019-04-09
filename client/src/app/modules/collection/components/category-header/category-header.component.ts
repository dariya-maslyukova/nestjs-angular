import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QueryParamsService } from '../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../models/products-query.model';
import { SelectOption } from '../../../../interfaces/select-option.interface';
import { SortDirection } from '../../../../enums/sort-direction.enum';
import { CategoryService } from '../../../../services/category.service';
import { SidebarService } from '../../../../services/sidebar.service';
import { Categories } from '../../../../enums/categories.enum';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryHeaderComponent implements OnInit, OnDestroy {

  totalFound: number;

  sortOptions: SelectOption<SortDirection>[] = [
    {
      value: SortDirection.LATEST_ARRIVALS,
      label: 'Latest Arrivals',
    },
    {
      value: SortDirection.BEST_MATCH,
      label: 'Best Match',
    },
    {
      value: SortDirection.ASC,
      label: 'Low Price',
    },
    {
      value: SortDirection.DES,
      label: 'High Price',
    },
  ];

  filters = {
    sort: SortDirection.BEST_MATCH,
  };

  private destroyedSubject = new Subject<void>();

  constructor(
    private qps: QueryParamsService<ProductsQueryModel>,
    private cs: CategoryService,
    private cdr: ChangeDetectorRef,
    private sbs: SidebarService,
  ) {

  }

  ngOnInit(): void {
    this.cs
      .totalFoundProducts$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(total => {
        this.totalFound = total;
        this.cdr.markForCheck();
      });
  }

  toggleSidebar(event: Event): void {
    event.stopPropagation();
    this.sbs.toggleSidebar();
  }

  onValueChange(value: Categories, attr: string): void {
    this.filters[attr] = value;
    this.qps.updateQueryParams(this.filters);
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
