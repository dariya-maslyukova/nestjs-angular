import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../../shared/shared.module';

const MODALS = [];

@NgModule({
  entryComponents: MODALS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [
    // ModalService
  ],
  declarations: [
    ...MODALS
  ],
})
export class MainModule {
}
