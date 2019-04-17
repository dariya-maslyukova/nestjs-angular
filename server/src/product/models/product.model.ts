import { InstanceType, ModelType, prop } from 'typegoose';

import { Model, schemaOptions } from '../../shared/model';
import { ObjectClass } from '../../shared/enums/object-class.enum';
import { Category } from '../../shared/enums/category.enum';
import { ParentCategory } from '../../shared/enums/parent-category.enum';
import { Attribute } from '../interfaces/attribute.interface';
import { Country } from '../../shared/enums/country.enum';
import { Brand } from '../../shared/enums/brand.enum';

export class Product extends Model<Product> {
  @prop({ required: [true, 'Name is required'] })
  name: string;

  @prop({
    required: [true, 'SKU is required'],
    unique: true,
  })
  sku: string;

  @prop()
  description: string;

  @prop()
  shortDescription: string;

  @prop({ required: [true, 'Price is required'] })
  price: number;

  @prop()
  discountPrice: number;

  @prop({ enum: Category })
  category: Category;

  @prop({ enum: ParentCategory })
  parentCategory: ParentCategory;

  @prop()
  attributes: Attribute[];

  @prop({ enum: Brand })
  brandName: Brand;

  @prop({ enum: Country })
  country: Country;

  @prop({ required: [true, 'Quantity is required'], default: 1 })
  quantity: number;

  @prop()
  baseImage: string;

  @prop()
  additionalImages: string[];

  @prop({
    enum: ObjectClass,
    default: ObjectClass.CollectionProducts,
  }) objectClass?: ObjectClass;

  @prop()
  get urlKey(): string {
    return `${this.name.toLowerCase().replace(/\s/g, '-')}-${this.sku}`;
  }

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
