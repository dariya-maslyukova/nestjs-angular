import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusBlurDirective } from './focus-blur.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ FocusBlurDirective ],
  exports: [ FocusBlurDirective ]
})
export class FocusBlurModule {
}
