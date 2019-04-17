import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexSliderComponent } from './flex-slider.component';
import { RouterModule } from '@angular/router';
import { FlexCaptionComponent } from './components/flex-caption/flex-caption.component';

@NgModule({
  declarations: [ FlexSliderComponent, FlexCaptionComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ FlexSliderComponent ]
})
export class FlexSliderModule { }
