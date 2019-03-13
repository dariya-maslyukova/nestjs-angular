import { BaseModel, schemaOptions } from '../../shared/base.model';
import { InstanceType, ModelType, prop } from 'typegoose';

export class Slider extends BaseModel<Slider> {
  @prop({ required: [true, 'Image is required'] })
  Image: string;
  @prop() Link: string;
  @prop() TopText: string;
  @prop() BoldText: string;
  @prop() BotText: string;
  @prop() CaptionText: string;
  @prop({ default: true })
  IsActive: boolean;

  static get model(): ModelType<Slider> {
    return new Slider().getModelForClass(Slider, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<Slider> {
    return new this.model();
  }
}
