import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionLayoutComponent } from '../../components/collection-layout/collection-layout.component';
import { ProductLayoutComponent } from './components/product/product-layout/product-layout.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: '', component: CollectionLayoutComponent,
    data: { state: 'collection' },
    children: [
      {
        path: 'women',
        loadChildren: './modules/women/women.module#WomenModule',
        data: { state: 'women' },
      },
      {
        path: 'women/product/:sku', component: ProductLayoutComponent,
        data: { state: 'womenProductDetails' },
        children: [
          {
            path: '',
            component: ProductComponent,
            data: { state: 'womenProductDetails' },
          },
        ],
      },
      {
        path: 'men',
        loadChildren: './modules/men/men.module#MenModule',
        data: { state: 'men' },
      },
      {
        path: 'men/product/:sku', component: ProductLayoutComponent,
        data: { state: 'menProductDetails' },
        children: [
          {
            path: '',
            component: ProductComponent,
            data: { state: 'menProductDetails' },
          },
        ],
      },
      {
        path: 'sale',
        // loadChildren: './modules/women/women.module#MenModule',
        data: {
          state: 'sale',
        },
      },
    ],
  },
  {
    path: 'look', component: CollectionComponent,
    data: { state: 'collectionLook' },
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CollectionRoutingModule {
}
