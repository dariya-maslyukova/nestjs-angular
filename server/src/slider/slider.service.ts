import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { Slider } from './models/slider.model';
import { ModelType } from 'typegoose';
import { InjectModel } from '@nestjs/mongoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { SliderParams } from './models/view-models/slider-params.model';

@Injectable()
export class SliderService extends BaseService<Slider> {
  constructor(
    @InjectModel(Slider.modelName) private readonly sliderModel: ModelType<Slider>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this.model = sliderModel;
    this.mapper = mapperService.mapper;
  }

  async createSlide(params: SliderParams): Promise<Slider> {
    const { Image, Link, TopText, BoldText, BotText, CaptionText, IsActive } = params;

    const newSlider = Slider.createModel();
    newSlider.Image = `assets/pictures/home-slider/${Image}`;

    if (Link) {
      newSlider.Link = Link;
    }

    if (TopText) {
      newSlider.TopText = TopText;
    }

    if (BoldText) {
      newSlider.BoldText = BoldText;
    }

    if (BotText) {
      newSlider.BotText = BotText;
    }

    if (CaptionText) {
      newSlider.CaptionText = CaptionText;
    }

    if (IsActive !== null) {
      newSlider.IsActive = IsActive;
    } else {
      newSlider.IsActive = true;
    }

    try {
      const result = await this.create(newSlider);
      return result.toJSON() as Slider;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
