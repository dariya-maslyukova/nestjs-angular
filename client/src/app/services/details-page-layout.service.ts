import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsPageLayoutService {

  private _isLoading: boolean;
  private isLoadingSubject = new Subject<boolean>();

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(isLoading) {
    this._isLoading = isLoading;
    this.isLoadingSubject.next(isLoading);
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }
}
