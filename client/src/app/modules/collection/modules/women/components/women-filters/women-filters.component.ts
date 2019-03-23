import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectOption } from '../../../../../../interfaces/select-option.interface';
import { ProductsFilters } from '../../../../../../interfaces/product/product-filters.interface';
import { Subject } from 'rxjs';
import { QueryParamsService } from '../../../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../../../models/products-query.model';
import { FormControl } from '@angular/forms';
import { Category } from '../../../../../../enums/category.enum';
import { SortDirection } from '../../../../../../enums/sort-direction.enum';

@Component({
  selector: 'app-women-filters',
  templateUrl: './women-filters.component.html',
})
export class WomenFiltersComponent implements OnInit, OnDestroy {

  sortOptions: SelectOption<SortDirection>[] = [
    {
      // value: SortDirection.DESC,
      value: 'descending',
      label: 'Low Price',
    },
    {
      // value: SortDirection.ASC,
      value: 'ascending',
      label: 'High Price',
    },
  ];

  categoryOptions: SelectOption<Category>[] = [
    {
      value: Category.Women,
      label: 'All',
    },
    {
      value: Category.Beachwear,
      label: 'Beachwear',
    },
    {
      value: Category.BlousesTops,
      label: 'BlousesTops',
    },
    {
      value: Category.Dresses,
      label: 'Dresses',
    },
  ];

  filters: ProductsFilters = {
    category: Category.Women,
    size: '',
    color: '',
  };

  categories = new FormControl();

  private destroyedSubject = new Subject<void>();

  constructor(
    private qps: QueryParamsService<ProductsQueryModel>,
  ) {

  }

  ngOnInit() {
    this.qps.updateQueryParams(this.filters);
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
