import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectOption } from '../../../../../../interfaces/select-option.interface';
import { ProductsFilters } from '../../../../../../interfaces/product/product-filters.interface';
import { Subject } from 'rxjs';
import { QueryParamsService } from '../../../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../../../models/products-query.model';
import { Category } from '../../../../../../enums/category.enum';

@Component({
  selector: 'app-women-filters',
  templateUrl: './women-filters.component.html'
})
export class WomenFiltersComponent implements OnInit, OnDestroy {

  selectedValue;
  categoryOptions: SelectOption<Category>[] = [
    {
      value: Category.Women,
      label: 'All'
    },
    {
      value: Category.Men,
      label: 'Men'
    },
    {
      value: Category.Collection,
      label: 'Collection'
    }
  ];

  filters: ProductsFilters = {
    category: Category.Women,
    size: '',
    color: '',
  };

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
