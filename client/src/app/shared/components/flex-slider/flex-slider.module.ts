import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexSliderComponent } from './flex-slider.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ FlexSliderComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ FlexSliderComponent ]
})
export class FlexSliderModule { }
