import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';
import { Slider } from './models/slider.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Slider.modelName, schema: Slider.model.schema }])],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {
}
