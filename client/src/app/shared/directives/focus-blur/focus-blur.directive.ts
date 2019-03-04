import { Directive, HostListener, OnDestroy, OnInit, Optional } from '@angular/core';

import { NgSelectComponent } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appFocusBlur]'
})
export class FocusBlurDirective implements OnInit, OnDestroy {

  isFocused: boolean;

  private destroyedSubject = new Subject<void>();

  constructor(@Optional() private ngSelect: NgSelectComponent) {
  }

  ngOnInit(): void {
    // In case when we have this directive bind on `ng-select`
    if (this.ngSelect) {
      this.ngSelect.focusEvent
        .pipe(takeUntil(this.destroyedSubject))
        .subscribe(() => {
          this.isFocused = true;
        });

      this.ngSelect.blurEvent
        .pipe(takeUntil(this.destroyedSubject))
        .subscribe(() => {
          this.isFocused = false;
        });
    }
  }

  @HostListener('focus') onHostFocus(): void {
    // In case when we have this directive bind on `ng-select`
    if (this.ngSelect) {
      return;
    }

    this.isFocused = true;
  }

  @HostListener('blur') onHostBlur(): void {
    // In case when we have this directive bind on `ng-select`
    if (this.ngSelect) {
      return;
    }

    this.isFocused = false;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
