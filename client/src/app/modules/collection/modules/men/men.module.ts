import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenJacketsCoatsComponent } from './components/pages/men-jackets-coats/men-jackets-coats.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, CarouselModule } from 'ngx-bootstrap';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '../../../../shared/shared.module';
import { MenComponent } from './components/pages/men/men.component';
import { MenRoutingModule } from './men-routing.module';

const COMPONENTS = [
  MenComponent,
  MenJacketsCoatsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    MenRoutingModule,
    AngularSvgIconModule,
    SharedModule,
    CarouselModule.forRoot()
  ],
  declarations: [
    [...COMPONENTS],
  ],
  exports: [
    [...COMPONENTS],
  ],
})
export class MenModule { }
