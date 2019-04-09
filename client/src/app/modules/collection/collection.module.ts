import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollectionRoutingModule } from './collection-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionLayoutComponent } from '../../components/collection-layout/collection-layout.component';
import { CategoryHeaderComponent } from './components/category-header/category-header.component';
import { ModalService } from '../../services/modal.service';
import { CarouselModalComponent } from './components/carousel-modal/carousel-modal.component';
import { CarouselModule, ModalModule } from 'ngx-bootstrap';
import { ProductComponent } from './components/product/product.component';
import { ProductLayoutComponent } from './components/product/product-layout/product-layout.component';

const MODALS = [
  CarouselModalComponent,
];

const COMPONENTS = [
  CollectionComponent,
  CollectionLayoutComponent,
  CategoryHeaderComponent,
  ProductComponent,
  ProductLayoutComponent
];

@NgModule({
  entryComponents: MODALS,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollectionRoutingModule,
    SharedModule,
    CarouselModule,
    ModalModule.forRoot(),
  ],
  providers: [
    ModalService
  ],
  declarations: [
    ...MODALS,
    ...COMPONENTS
  ]
})
export class CollectionModule {
}
