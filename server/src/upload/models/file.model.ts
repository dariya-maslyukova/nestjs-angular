import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';

export class File extends BaseModel<File> {
  @prop() OriginalName: string;
  @prop() FileName: string;
  @prop() FileFolder: string;
  @prop() Size: number;
  @prop() Type: number;

  static get model(): ModelType<File> {
    return new File().getModelForClass(File, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<File> {
    return new this.model();
  }
}
