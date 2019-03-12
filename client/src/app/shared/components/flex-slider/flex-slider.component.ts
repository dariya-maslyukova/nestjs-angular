import { Component, DoCheck } from '@angular/core';
import { SLIDER_ANIMATIONS } from '../../../app.animations';

declare const $: any;

@Component({
  selector: 'app-flex-slider',
  templateUrl: './flex-slider.component.html',
  animations: [...SLIDER_ANIMATIONS]
})

export class FlexSliderComponent implements DoCheck {

  constructor() {
  }

  ngDoCheck() {
    $('.flexslider').flexslider({
      animation: 'slide',
      slideshow: false,
      move: 1,
      useCSS: false,
      nextText: '',
      easing: 'easeOutCirc',
      animationSpeed: 1200,
      controlNav: false,
      before: (slider) => {

        $('.flexslider li')
          .removeClass('prev-slide')
          .removeClass('next-slide');
          // .find($('.flex-caption')).addClass('hidden');

        $(slider).find('.move').each(function() {
          $(this).removeClass('move');
        });

        // var wow = new WOW({
        //   mobile: false
        // });
        // wow.init();
      },
      start: (slider) => {

        // $('.flexslider li').find($('.flex-caption')).addClass('hidden');
        $(slider).find('.flex-active-slide').addClass('move');

        this.addSlidesClass();
      },
      after: (slider) => {
        this.addSlidesClass();

        $(slider).find('.flex-active-slide').addClass('move');
      },
    });
  }

  private addSlidesClass() {
    $('.flexslider li.flex-active-slide')
      .prev('li').addClass('prev-slide');
    $('.flexslider li.flex-active-slide')
      .next('li').addClass('next-slide');
    // $('.flexslider li.flex-active-slide')
    //   .find($('.flex-caption')).removeClass('hidden');
  }

}
