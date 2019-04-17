import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as  mongoosePaginate from 'mongoose-paginate-v2';

import { SliderController } from './slider.controller';
import { SliderService } from './slider.service';
import { Slider } from './models/slider.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Slider.modelName, schema: Slider.model.schema.plugin(mongoosePaginate) }])],
  controllers: [SliderController],
  providers: [SliderService],
})
export class SliderModule {
}
