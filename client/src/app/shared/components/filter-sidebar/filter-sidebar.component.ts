import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { ProductsFilters } from '../../../interfaces/product/product-filters.interface';
import { SelectOption } from '../../../interfaces/select-option.interface';
import { Color } from '../../../enums/color.enum';
import { Size } from '../../../enums/size.enum';
import { SortDirection } from '../../../enums/sort-direction.enum';
import { Category } from '../../../enums/category.enum';
import { QueryParamsService } from '../../../services/query-params.service';
import { ProductsQueryModel } from '../../../models/products-query.model';
import { SidebarState } from '../../../enums/sidebar-state.enum';
import { SidebarMode } from '../../../enums/sidebar-mode.enum';
import { FilterSidebarService } from '../../../services/filter-sidebar.service';
// import { merge } from 'lodash-es';
import * as _ from 'lodash-es';
import { browser } from 'protractor';

// TODO: decrease number doCheck calls
@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
})
export class FilterSidebarComponent implements OnDestroy {

  isLoading = true;
  step = 0;
  selected = [];

  colorOptions: SelectOption<Color>[] = [
    {
      value: Color.Black,
      label: 'Black',
    },
    {
      value: Color.White,
      label: 'White',
    },
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

  form: FormGroup;


  filters: ProductsFilters = {};
  // categories = new FormControl();
  // colors = new FormControl();
  // sizes = new FormControl();

  private state: SidebarState;
  private mode: SidebarMode;
  private destroyedSubject = new Subject<void>();

  @ViewChildren('categoryFilter') categoryFilter;
  @ViewChildren('colorFilter') colorFilter;
  @ViewChildren('sizeFilter') sizeFilter;

  constructor(
    private qps: QueryParamsService<ProductsQueryModel>,
    private fs: FilterSidebarService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      categories: this.fb.array([]),
      sizes: this.fb.array([]),
      colors: this.fb.array([]),
    });
  }

  onClearFilter(attr: string): void {
    // this.selected = [];
    // this.filters[attr] = this.selected.map(select => select);
    // this.qps.updateQueryParams(this.filters);
    //
    // this.categoryFilter._results.map(checkbox => {
    //   checkbox.checked = false;
    // });
    // this.colorFilter._results.map(checkbox => {
    //   checkbox.checked = false;
    // });
    // this.sizeFilter._results.map(checkbox => {
    //   checkbox.checked = false;
    // });
  }

  onValueChange(event, attr: string) {
    switch (attr) {
      case 'category':
        const categories = <FormArray>this.form.get('categories') as FormArray;
        if (event.checked) {
          categories.push(new FormControl(event.source.value));
        } else {
          const i = categories.controls.findIndex(x => x.value === event.source.value);
          categories.removeAt(i);
        }
        this.filters[attr] = categories.value;
        break;
      case 'color':
        const colors = <FormArray>this.form.get('colors') as FormArray;
        if (event.checked) {
          colors.push(new FormControl(event.source.value));
        } else {
          const i = colors.controls.findIndex(x => x.value === event.source.value);
          colors.removeAt(i);
        }
        this.filters[attr] = colors.value;
        break;
      case 'size':
        const sizes = <FormArray>this.form.get('sizes') as FormArray;
        if (event.checked) {
          sizes.push(new FormControl(event.source.value));
        } else {
          const i = sizes.controls.findIndex(x => x.value === event.source.value);
          sizes.removeAt(i);
        }
        this.filters[attr] = sizes.value;
        break;
      default:
        break;
    }
    this.qps.updateQueryParams(this.filters);
  }

  get sidebarLinkDropdown(): boolean {
    return this.fs.sidebarLinkDropdown;
  }

  set sidebarLinkDropdown(value: boolean) {
    this.fs.sidebarLinkDropdown = value;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  get sidebarClasses(): object {
    return {
      'sidebar--open': this.state === SidebarState.OPEN_EXPANDED,
      'sidebar--inline-collapsed': this.mode === SidebarMode.INLINE &&
        this.state === SidebarState.CLOSED_COLLAPSED,
      'sidebar--inline-expanded': this.mode === SidebarMode.INLINE && this.state === SidebarState.OPEN_EXPANDED,
      'sidebar--nav-disabled': this.fs.isNavigationDisabled,
    };
  }

}
