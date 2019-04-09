import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectOption } from '../../../../../../interfaces/select-option.interface';
import { Color } from '../../../../../../enums/color.enum';
import { Size } from '../../../../../../enums/size.enum';
import { SortDirection } from '../../../../../../enums/sort-direction.enum';
import { ProductsFilters } from '../../../../../../interfaces/product/product-filters.interface';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { QueryParamsService } from '../../../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../../../models/products-query.model';
import { Categories } from '../../../../../../enums/categories.enum';

@Component({
  selector: 'app-men-filters',
  templateUrl: './men-filters.component.html'
})
export class MenFiltersComponent implements OnInit, OnDestroy {

  colorOptions: SelectOption<Color>[] = [
    {
      value: Color.Black,
      label: 'Black',
    },
    {
      value: Color.White,
      label: 'White',
    }
  ];

  sizeOptions: SelectOption<Size>[] = [
    {
      value: Size.S,
      label: 'S',
    },
    {
      value: Size.M,
      label: 'M',
    },
    {
      value: Size.L,
      label: 'L',
    },
    {
      value: Size.XL,
      label: 'XL',
    },
  ];

  sortOptions: SelectOption<SortDirection>[] = [
    {
      value: SortDirection.ASC,
      label: 'Low Price',
    },
    {
      value: SortDirection.DES,
      label: 'High Price',
    },
  ];

  categoryOptions = [];

  filters: ProductsFilters = {
    category: Categories.Men,
    size: '',
    color: '',
  };

  categories = new FormControl();
  colors = new FormControl();
  sizes = new FormControl();

  private destroyedSubject = new Subject<void>();

  constructor(
    private qps: QueryParamsService<ProductsQueryModel>,
  ) {

  }

  ngOnInit() {
    this.qps.updateQueryParams(this.filters);
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
