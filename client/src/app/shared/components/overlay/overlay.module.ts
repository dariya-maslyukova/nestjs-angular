import { LoadersCssModule } from 'angular2-loaders-css';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayComponent } from './overlay.component';

@NgModule({
  imports: [
    CommonModule,
    LoadersCssModule
  ],
  declarations: [
    OverlayComponent
  ],
  exports: [
    OverlayComponent,
    LoadersCssModule
  ]
})
export class OverlayModule {
}
