import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule, MatRadioModule,
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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SliceArrayPipe } from './pipes/slice-array.pipe';

const DIRECTIVES = [];

const PIPES = [
  SliceArrayPipe,
];

const COMPONENTS = [
  GridPagerComponent,
  SidebarComponent,
  DropdownComponent,
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
    MatRadioModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
    FormsModule,
    ReactiveFormsModule,
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
    MatRadioModule
  ],
})
export class SharedModule {
}
