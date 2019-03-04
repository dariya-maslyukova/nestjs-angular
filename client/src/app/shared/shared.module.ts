import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlModule } from './components/form-control/form-control.module';
import { FocusBlurModule } from './directives/focus-blur/focus-blur.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormControlModule,
    FocusBlurModule,
    NgSelectModule,
    AngularSvgIconModule,
  ],
  exports: [
    FormControlModule,
    FocusBlurModule,
    NgSelectModule,
    AngularSvgIconModule,
  ],
})
export class SharedModule { }
