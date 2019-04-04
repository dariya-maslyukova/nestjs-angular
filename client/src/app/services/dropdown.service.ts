import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { NavItemGroup } from '../interfaces/nav/nav-item-group.interface';
import { SidebarState } from '../enums/sidebar-state.enum';
import { SidebarMode } from '../enums/sidebar-mode.enum';
import { SectionBackOption } from '../interfaces/section-back-option.interface';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  isDisabled = true;
  isNavigationDisabled = false;
  sidebarHeaderDropdown = true;

  private _currentSectionNameSubject = new Subject<string>();

  private _sectionBackOption: SectionBackOption;
  private _sectionBackOptionSubject = new Subject<SectionBackOption>();

  private _dropdownItems: NavItemGroup[] = [];
  private _dropdownItemsSubject = new Subject<NavItemGroup[]>();
  private _stateSubject = new Subject<SidebarState>();
  private _modeSubject = new Subject<SidebarMode>();

  private _currentSectionName = '';

  get currentSectionName(): string {
    return this._currentSectionName;
  }

  set currentSectionName(name: string) {
    this._currentSectionName = name;
    this._currentSectionNameSubject.next(name);
  }

  get dropdownItems(): NavItemGroup[] {
    return this._dropdownItems;
  }

  set dropdownItems(groups: NavItemGroup[]) {
    this._dropdownItems = groups;
    this._dropdownItemsSubject.next(groups);
  }

  private _state: SidebarState;

  get state(): SidebarState {
    return this._state;
  }

  set state(state: SidebarState) {
    this._state = state;
    this._stateSubject.next(state);
  }

  private _mode: SidebarMode;

  private _isHeaderHidden: boolean;
  private _isHeaderHiddenSubject = new Subject<boolean>();

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

  get dropdownItems$(): Observable<NavItemGroup[]> {
    return this._dropdownItemsSubject.asObservable();
  }

  get currentSectionName$(): Observable<string> {
    return this._currentSectionNameSubject.asObservable();
  }

  toggleDropdown(): void {
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

  resetInfoAndNav(disableSidebar: boolean): void {
    if (disableSidebar) {
      this.isDisabled = true;
    }

    this.dropdownItems = [];
    this.sidebarHeaderDropdown = true;
  }

  refreshdropdownItems(): void {
    this._dropdownItemsSubject.next(this._dropdownItems);
  }

  set sectionBackOption(option: SectionBackOption) {
    this._sectionBackOption = option;
    this._sectionBackOptionSubject.next(this._sectionBackOption);
  }

  get sectionBackOption(): SectionBackOption {
    return this._sectionBackOption;
  }

  get sectionBackOption$(): Observable<SectionBackOption> {
    return this._sectionBackOptionSubject.asObservable();
  }

  set isHeaderHidden(isHeaderHidden) {
    this._isHeaderHidden = isHeaderHidden;
    this._isHeaderHiddenSubject.next(isHeaderHidden);
  }

  get isHeaderHidden(): boolean {
    return this._isHeaderHidden;
  }

  get isHeaderHidden$(): Observable<boolean> {
    return this._isHeaderHiddenSubject.asObservable();
  }

}