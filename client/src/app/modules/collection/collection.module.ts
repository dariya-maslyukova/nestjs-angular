import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionRoutingModule } from './collection-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionLayoutComponent } from '../../components/collection-layout/collection-layout.component';

const MODALS = [];
const COMPONENTS = [
  CollectionComponent,
  CollectionLayoutComponent,
];

@NgModule({
  entryComponents: MODALS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollectionRoutingModule,
    SharedModule
  ],
  providers: [
    // ModalService
  ],
  declarations: [
    ...MODALS,
    ...COMPONENTS
  ]
})
export class CollectionModule {
}
