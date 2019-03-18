import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { FlexSlider } from '../../../interfaces/flex-slider.interface';
import { WindowResizeService } from '../../../services/window-resize.service';

declare const $: any;

@Component({
  selector: 'app-flex-slider',
  templateUrl: './flex-slider.component.html'
})

export class FlexSliderComponent implements DoCheck, OnInit {

  width: number;
  @Input() items: FlexSlider[] = [];
  @Input() easing = 'easeOutCirc';
  @Input() animationSpeed = 1200;

  protected destroyedSubject = new Subject<void>();

  constructor(private wrs: WindowResizeService) {

  }

  ngOnInit(): void {
    this.wrs
      .resized$
      .pipe(takeUntil(this.destroyedSubject))
      .subscribe(boxSize => {
        this.width = boxSize.width;
      });
  }

  ngDoCheck(): void {
    const animationSpeed = this.animationSpeed;
    const easing = this.easing;

    $('.flexslider').flexslider({
      animation: 'slide',
      slideshow: false,
      move: 1,
      useCSS: false,
      nextText: '',
      easing,
      animationSpeed,
      controlNav: false,
      before: (slider) => {

        $(slider).find('li')
          .removeClass('prev-slide')
          .removeClass('next-slide');

        $(slider).find('.move').each(function() {
          $(this).removeClass('move');
        });
      },
      start: (slider) => {
        $(slider).find('.flex-active-slide').addClass('move');
        this.addSlidesClass(slider);
      },
      after: (slider) => {
        this.addSlidesClass(slider);
        $(slider).find('.flex-active-slide').addClass('move');
      },
    });
  }

  private addSlidesClass(slider) {
    $(slider).find('li.flex-active-slide')
      .prev('li').addClass('prev-slide');
    $(slider).find('li.flex-active-slide')
      .next('li').addClass('next-slide');
  }

}
