import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { ProductsFilters } from '../../../interfaces/product/product-filters.interface';
import { SelectOption } from '../../../interfaces/select-option.interface';
import { Color } from '../../../enums/color.enum';
import { Size } from '../../../enums/size.enum';
import { QueryParamsService } from '../../../services/query-params.service';
import { ProductsQueryModel } from '../../../models/products-query.model';
import { SidebarState } from '../../../enums/sidebar-state.enum';
import { SidebarMode } from '../../../enums/sidebar-mode.enum';
import { SidebarService } from '../../../services/sidebar.service';
import { WindowResizeService } from '../../../services/window-resize.service';
import { BoxSize } from '../../../interfaces/box-size.interface';
import { CONFIG } from '../../../app.config';
import { SubCategories } from '../../../enums/sub-categories.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {

  isLoading = true;
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

  categoryOptions = [];
  filters: ProductsFilters = {};

  private state: SidebarState;
  private mode: SidebarMode;
  private destroyedSubject = new Subject<void>();

  @ViewChildren('categoryFilter') categoryFilter;
  @ViewChildren('colorFilter') colorFilter;
  @ViewChildren('sizeFilter') sizeFilter;

  constructor(
    private qps: QueryParamsService<ProductsQueryModel>,
    private ss: SidebarService,
    private cdr: ChangeDetectorRef,
    private wrs: WindowResizeService
  ) {
  }

  ngOnInit(): void {
    this.categoryOptions = this.ss.sidebarCategories;

    this.ss
      .state$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(state => {
        this.state = state;
        this.cdr.markForCheck();
      });

    this.wrs
      .resized$
      .pipe(
        throttleTime(200),
        takeUntil(this.destroyedSubject),
      )
      .subscribe((size: BoxSize) => {
        if (size.width >= CONFIG.mediaBreakpoints.tablet) {
          this.ss.mode = SidebarMode.FIXED;
          this.ss.state = SidebarState.CLOSED_COLLAPSED;
        }
      });
  }

  onClearFilter(attr: string): void {
    this.filters[attr] = '';
    this.selected[attr] = {};
    this.qps.updateQueryParams(this.filters);

    switch (attr) {
      case 'category':

        this.categoryFilter._results.map(checkbox => {
          checkbox.checked = false;
        });
        break;
      case 'color':
        this.colorFilter._results.map(checkbox => {
          checkbox.checked = false;
        });
        break;
      case 'size':
        this.sizeFilter._results.map(checkbox => {
          checkbox.checked = false;
        });
        break;
      default:
        break;
    }
  }

  onValueChange(event, attr: string) {

    const findIndex = this.selected.findIndex(select => select[attr] === event.source.value);

    if (findIndex > -1 && !event.checked) {
      this.selected.splice(findIndex, 1);
    }

    if (findIndex === -1 && event.checked) {
      this.selected.push({ [attr]: event.source.value });
    }

    this.filters[attr] = this.selected
      .map(select => select[attr])
      .filter(notUndefined => notUndefined);

    this.qps.updateQueryParams(this.filters);
  }

  onCloseSidebar() {
    this.ss.state = SidebarState.CLOSED_COLLAPSED;
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
    };
  }

}
