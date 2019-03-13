import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { HomeSlider } from '../../interfaces/home-slider.interface';
import { HomeSliderService } from '../../services/home-slider.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  slides: HomeSlider[] = [];
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
      .subscribe((response: HomeSlider[]) => {
        this.slides = response;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
