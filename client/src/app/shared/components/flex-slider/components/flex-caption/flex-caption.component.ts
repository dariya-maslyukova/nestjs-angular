import { Component, Input, OnInit } from '@angular/core';
import { FlexSlider } from '../../../../../interfaces/flex-slider.interface';

@Component({
  selector: 'app-flex-caption',
  templateUrl: './flex-caption.component.html'
})
export class FlexCaptionComponent implements OnInit {

  @Input() slide: FlexSlider;
  @Input() slideIndex: number;
  @Input() slidesCount: number;

  constructor() { }

  ngOnInit() {
  }

}
