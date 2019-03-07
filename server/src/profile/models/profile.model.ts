import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';

export class Profile extends BaseModel<Profile> {
  @prop({ required: [true, 'Content is required'] })
  content: string;

  static get model(): ModelType<Profile> {
    return new Profile().getModelForClass(Profile, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<Profile> {
    return new this.model();
  }
}
