import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  declarations: [ FormControlComponent ],
  exports: [ FormControlComponent ]
})
export class FormControlModule {
}
