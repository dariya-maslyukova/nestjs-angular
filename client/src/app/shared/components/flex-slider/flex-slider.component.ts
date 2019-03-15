import { Component, DoCheck, Input } from '@angular/core';
import { SLIDER_ANIMATIONS } from '../../../app.animations';
import { FlexSlider } from '../../../interfaces/flex-slider.interface';

declare const $: any;

@Component({
  selector: 'app-flex-slider',
  templateUrl: './flex-slider.component.html',
  animations: [...SLIDER_ANIMATIONS],
})

export class FlexSliderComponent implements DoCheck {

  @Input() items: FlexSlider[] = [];
  @Input() easing = 'easeOutCirc';
  @Input() animationSpeed = 1200;

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
    // $('.flexslider li.flex-active-slide')
    //   .find($('.flex-caption')).removeClass('hidden');
  }

}
