import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { SidebarState } from '../enums/sidebar-state.enum';
import { SidebarMode } from '../enums/sidebar-mode.enum';
import { Category } from '../enums/category.enum';
import { Brand } from '../enums/brand.enum';
import { Country } from '../enums/country.enum';


@Injectable({
  providedIn: 'root',
})
export class SidebarService {

  isDisabled = true;
  brands: Brand[] = [];
  countries: Country[] = [];
  private _stateSubject = new Subject<SidebarState>();
  private _modeSubject = new Subject<SidebarMode>();

  private _state: SidebarState;
  private _sidebarCategories: Category[] = [];
  private _sidebarCategoriesSubject = new Subject<Category[]>();

  get sidebarCategories(): Category[] {
    return this._sidebarCategories;
  }

  set sidebarCategories(categories: Category[]) {
    this._sidebarCategories = categories;
    this._sidebarCategoriesSubject.next(categories);
  }

  get sidebarCategories$(): Observable<Category[]> {
    return this._sidebarCategoriesSubject.asObservable();
  }

  get state(): SidebarState {
    return this._state;
  }

  set state(state: SidebarState) {
    this._state = state;
    this._stateSubject.next(state);
  }

  private _mode: SidebarMode;

  get mode(): SidebarMode {
    return this._mode;
  }

  set mode(mode: SidebarMode) {
    this._mode = mode;
    this._modeSubject.next(mode);
  }

  get state$(): Observable<SidebarState> {
    return this._stateSubject.asObservable();
  }

  get mode$(): Observable<SidebarMode> {
    return this._modeSubject.asObservable();
  }

  toggleSidebar(): void {
    if (this.isDisabled) {
      return;
    }

    this._state = this._state === SidebarState.OPEN_EXPANDED
      ? SidebarState.CLOSED_COLLAPSED
      : SidebarState.OPEN_EXPANDED;
    this._stateSubject.next(this._state);
  }

  close(): void {
    if (this.isDisabled || this._mode === SidebarMode.INLINE) {
      return;
    }

    this._state = SidebarState.CLOSED_COLLAPSED;
    this._stateSubject.next(this._state);
  }
}
