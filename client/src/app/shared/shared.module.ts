import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LoadersCssModule } from 'angular2-loaders-css';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MatControlModule } from './components/mat-control/mat-control.module';
import { FormControlModule } from './components/form-control/form-control.module';
import { FocusBlurModule } from './directives/focus-blur/focus-blur.module';


const DIRECTIVES = [];

const PIPES = [];

const COMPONENTS = [];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormControlModule,
    MatControlModule,
    FocusBlurModule,
    NgSelectModule,
    AngularSvgIconModule,
    LoadersCssModule,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
    FormControlModule,
    MatControlModule,
    FocusBlurModule,
    NgSelectModule,
    AngularSvgIconModule,
    LoadersCssModule,
    MatButtonModule,
  ],
})
export class SharedModule {
}
