import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { HomeSliderService } from '../../services/home-slider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  response;
  isLoading = false;

  protected destroyedSubject = new Subject<void>();

  constructor(
    private hs: HomeSliderService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {

    this.isLoading = true;

    this.hs
      .getList()
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(response => {
        this.response = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
