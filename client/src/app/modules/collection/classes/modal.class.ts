import { OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { BsModalRef } from 'ngx-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalCloseResult } from '../../../enums/modal-close-result.enum';

export abstract class Modal implements OnDestroy {

  protected _id: string;
  protected _modalCloseReason: ModalCloseResult;
  protected modalCloseReasonSubject = new Subject<ModalCloseResult>();
  protected onCloseResultSubject = new Subject<any>();
  protected destroyedSubject = new Subject<void>();

  // For usage in template
  modalCloseResult = ModalCloseResult;

  isLoading: boolean;

  protected constructor(protected modalRef: BsModalRef) {
    this._id = Math.random().toString(36).substr(2, 9);
  }

  get id(): string {
    return this._id;
  }

  get modalCloseReason(): ModalCloseResult {
    return this._modalCloseReason;
  }

  get modalCloseReason$(): Observable<ModalCloseResult> {
    return this.modalCloseReasonSubject.asObservable();
  }

  get onCloseResult$(): Observable<any> {
    return this.onCloseResultSubject.asObservable();
  }

  close(modalCloseReason: ModalCloseResult): void {
    this._modalCloseReason = modalCloseReason;

    const res = this.onClose(modalCloseReason);

    if (!res) {
      this.onCloseResultSubject.next();
      this.onCloseResultSubject.complete();

      this.modalCloseReasonSubject.next(modalCloseReason);
      this.modalCloseReasonSubject.complete();

      this.modalRef.hide();

      return;
    }

    res
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(result => {
        this.onCloseResultSubject.next(result);
        this.onCloseResultSubject.complete();

        this.modalCloseReasonSubject.next(modalCloseReason);
        this.modalCloseReasonSubject.complete();

        this.modalRef.hide();
      });
  }

  abstract onClose(result: ModalCloseResult): Observable<any> | void;

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }
}
