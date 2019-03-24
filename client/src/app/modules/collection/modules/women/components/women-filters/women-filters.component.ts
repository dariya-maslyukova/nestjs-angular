import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectOption } from '../../../../../../interfaces/select-option.interface';
import { ProductsFilters } from '../../../../../../interfaces/product/product-filters.interface';
import { Subject } from 'rxjs';
import { QueryParamsService } from '../../../../../../services/query-params.service';
import { ProductsQueryModel } from '../../../../../../models/products-query.model';
import { FormControl } from '@angular/forms';
import { Category } from '../../../../../../enums/category.enum';
import { SortDirection } from '../../../../../../enums/sort-direction.enum';
import { Size } from '../../../../../../enums/size.enum';
import { Color } from '../../../../../../enums/color.enum';

@Component({
  selector: 'app-women-filters',
  templateUrl: './women-filters.component.html',
})
export class WomenFiltersComponent implements OnInit, OnDestroy {

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
      label: 'Blouses/Tops',
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

  onValueChange(value: Category, attr: string): void {
    this.filters[attr] = value;
    this.qps.updateQueryParams(this.filters);
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
