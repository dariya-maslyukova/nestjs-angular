import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { HomeSliderService } from '../../services/home-slider.service';
import { MAIN_ROUTE_ANIMATION } from '../../app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [ MAIN_ROUTE_ANIMATION ]
})
export class HomeComponent implements OnInit, OnDestroy {

  response;
  isLoading = true;

  protected destroyedSubject = new Subject<void>();

  constructor(
    private hs: HomeSliderService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.hs
      .getList()
      .pipe(
        takeUntil(this.destroyedSubject),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
        )
      .subscribe(response => {
        this.response = response;
      });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
