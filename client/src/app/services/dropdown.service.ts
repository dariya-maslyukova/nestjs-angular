import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { SidebarState } from '../enums/sidebar-state.enum';
import { SidebarMode } from '../enums/sidebar-mode.enum';
import { DropdownType } from '../enums/dropdown-type.enum';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {

  isDisabled = true;

  isDropdownShowCart = false;
  isDropdownShowWishlist = false;

  private _stateSubject = new Subject<SidebarState>();
  private _modeSubject = new Subject<SidebarMode>();

  private _state: SidebarState;
  private _mode: SidebarMode;

  get state(): SidebarState {
    return this._state;
  }

  set state(state: SidebarState) {
    this._state = state;
    this._stateSubject.next(state);
  }

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

  toggleDropdown(label?: DropdownType): void {
    if (this.isDisabled) {
      return;
    }

    switch (label) {
      case DropdownType.CART:
        this.isDropdownShowCart = true;
        this.isDropdownShowWishlist = false;
        break;
      case DropdownType.WISHLIST:
        this.isDropdownShowCart = false;
        this.isDropdownShowWishlist = true;
        break;
      default:
        break;
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

  open(): void {
    this._state = SidebarState.OPEN_EXPANDED;
    this._stateSubject.next(this._state);
  }
}
