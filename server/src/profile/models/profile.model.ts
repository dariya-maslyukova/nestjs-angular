import { InstanceType, ModelType, prop } from 'typegoose';
import { Model, schemaOptions } from '../../shared/model';

export class Profile extends Model<Profile> {
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
