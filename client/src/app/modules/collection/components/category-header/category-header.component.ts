import { Component, OnDestroy } from '@angular/core';
import { Category } from '../../../../enums/category.enum';
import { Subject } from 'rxjs';
import { QueryParamsService } from '../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../models/products-query.model';
import { SelectOption } from '../../../../interfaces/select-option.interface';
import { SortDirection } from '../../../../enums/sort-direction.enum';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html'
})
export class CategoryHeaderComponent implements OnDestroy {

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

  filters = {};

  private destroyedSubject = new Subject<void>();

  constructor(
    private qps: QueryParamsService<ProductsQueryModel>,
  ) {

  }

  onValueChange(value: Category, attr: string): void {
    this.filters[attr] = value;
    this.qps.updateQueryParams(this.filters);
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
