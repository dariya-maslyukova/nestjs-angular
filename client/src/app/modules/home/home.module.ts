import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FlexSliderModule } from '../../shared/components/flex-slider/flex-slider.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FlexSliderModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
