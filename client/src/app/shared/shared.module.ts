import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatSelectModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { LoadersCssModule } from 'angular2-loaders-css';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MatControlModule } from './components/mat-control/mat-control.module';
import { FormControlModule } from './components/form-control/form-control.module';
import { FocusBlurModule } from './directives/focus-blur/focus-blur.module';
import { OverlayModule } from './components/overlay/overlay.module';
import { GridPagerComponent } from './components/grid-pager/grid-pager.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';

const DIRECTIVES = [];

const PIPES = [];

const COMPONENTS = [
  GridPagerComponent,
  FilterSidebarComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
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
    OverlayModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
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
    OverlayModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
  ],
})
export class SharedModule {
}
