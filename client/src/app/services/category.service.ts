import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { ObjectClass } from '../enums/object-class.enum';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  currentObjectClass: ObjectClass;
  private _currentSectionNameSubject = new Subject<string>();
  private _currentSectionName = '';
  private _currentSectionDescriptionSubject = new Subject<string>();
  private _currentSectionDescription = '';

  get currentSectionName(): string {
    return this._currentSectionName;
  }

  set currentSectionName(name: string) {
    this._currentSectionName = name;
    this._currentSectionNameSubject.next(name);
  }

  get currentSectionName$(): Observable<string> {
    return this._currentSectionNameSubject.asObservable();
  }

  get currentSectionDescription(): string {
    return this._currentSectionDescription;
  }

  set currentSectionDescription(desc: string) {
    this._currentSectionDescription = desc;
    this._currentSectionDescriptionSubject.next(desc);
  }

  get currentSectionDescription$(): Observable<string> {
    return this._currentSectionDescriptionSubject.asObservable();
  }

}
