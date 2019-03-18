import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Linear } from 'gsap/all';
import { TweenMax, TimelineMax } from 'gsap';
import { ScrollMagic } from 'scrollmagic';

declare const TweenMax: any;
declare const ScrollMagic: any;

@Component({
  selector: 'app-animate-products-section',
  templateUrl: './animate-products-section.component.html',
})
export class AnimateProductsSectionComponent implements OnInit {

  controller: any;

  @ViewChild('triggerPin') triggerPin: ElementRef;
  @ViewChild('triggerAnimateLeft') triggerAnimateLeft: ElementRef;
  @ViewChild('triggerAnimateRight') triggerAnimateRight: ElementRef;
  @ViewChild('pathLeft') pathLeft: ElementRef;
  @ViewChild('pathRight') pathRight: ElementRef;
  @ViewChild('moveElement') moveElement: ElementRef;
  @ViewChild('imageCell') imageCell: ElementRef;
  @ViewChild('triggerBg') triggerBg: ElementRef;
  @ViewChild('triggerBgImage') triggerBgImage: ElementRef;

  constructor() {
    this.controller = new ScrollMagic.Controller();
  }

  ngOnInit(): void {
    this.doIt();
  }

  doIt(): void {

    // prepare SVG
    this.pathPrepare(this.pathLeft.nativeElement);
    this.pathPrepare(this.pathRight.nativeElement);

    const tween = new TimelineMax().add([
      TweenMax.fromTo(this.moveElement.nativeElement, 1, { y: 0 }, { y: '10%', ease: Linear.easeNone }),
      TweenMax.fromTo(this.triggerAnimateLeft.nativeElement, 1, { y: 0 }, {
        y: '20%',
        ease: Linear.easeNone,
      }),
      TweenMax.fromTo(this.triggerAnimateRight.nativeElement, 1, { y: 0 }, {
        y: '20%',
        ease: Linear.easeNone,
      }),
      TweenMax.to(this.pathLeft.nativeElement, 0.5, { strokeDashoffset: 0, ease: Linear.easeNone }),
      TweenMax.to(this.pathRight.nativeElement, 0.5, { strokeDashoffset: 0, ease: Linear.easeNone }),
      TweenMax.fromTo(this.imageCell.nativeElement, 1, { backgroundPosition: '0 0' }, {
        backgroundPosition: '50% 50%',
        ease: Linear.easeNone,
      }),
    ]);

    // build scene
    new ScrollMagic.Scene({ triggerElement: this.triggerPin.nativeElement, duration: 800, offset: 400 })
      .setTween(tween)
      .setPin(this.triggerPin.nativeElement)
      // .addIndicators()
      .addTo(this.controller);

    const tweenBg = new TimelineMax()
      .add([
        TweenMax.fromTo(this.triggerBgImage.nativeElement, 1, { backgroundPosition: '0% 50%' }, {
          backgroundPosition: '100% 50%',
          ease: Linear.easeNone,
        }),
      ]);

    // build scenes
    new ScrollMagic.Scene({ triggerElement: this.triggerBg.nativeElement, duration: 1000, offset: -200 })
      .setTween(tweenBg)
      // .addIndicators()
      .addTo(this.controller);
  }

  private pathPrepare(element): void {
    const lineLength = element.getTotalLength();
    element.style.strokeDasharray = lineLength;
    element.style.strokeDashoffset = lineLength;
  }

}
