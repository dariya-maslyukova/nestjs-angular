import { Model, schemaOptions } from '../../shared/model';
import { InstanceType, ModelType, prop } from 'typegoose';
import * as mongoose from 'mongoose';

import { ObjectClass } from '../../shared/enums/object-class.enum';
import { ProductDocument } from '../../shared/interfaces/product-document.interface';
import TPaginatedModel from 'src/shared/paginate.model';

export class Product extends Model<Product & ProductDocument> {
  @prop({ required: [true, 'Name is required'] })
  name: string;

  @prop({
    required: [true, 'SKU is required'],
    unique: true,
  })
  sku: number;

  @prop()
  description: string;

  @prop({ required: [true, 'Price is required'] })
  price: number;

  @prop()
  discountPrice: number;

  @prop()
  categories: string[];

  @prop({ required: [true, 'Quantity is required'], default: 1 })
  quantity: number;

  @prop()
  baseImage: string;

  @prop()
  additionalImages: string[];

  @prop({
    enum: ObjectClass,
  }) objectClass?: ObjectClass;

  @prop()
  get images(): string[] {
    if (this.additionalImages) {
      return [this.baseImage, ...this.additionalImages];
    } else {
      return [this.baseImage];
    }

  }

  static get model(): ModelType<Product> {
    return new Product().getModelForClass(Product, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<Product> {
    return new this.model();
  }
}
