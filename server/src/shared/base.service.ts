import 'automapper-ts/dist/automapper';
import { Types } from 'mongoose';
import { InstanceType, ModelType, Typegoose } from 'typegoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { BaseModel } from './base.model';

export abstract class BaseService<T extends Typegoose> {
  protected model: ModelType<T> & mongoosePaginate.IMongoosePaginate;
  protected mapper: AutoMapperJs.AutoMapper;

  private get modelName(): string {
    return this.model.modelName;
  }

  private get viewModelName(): string {
    return `${this.model.modelName}Vm`;
  }

  async map<K>(
    object: Partial<InstanceType<T>> | Array<Partial<InstanceType<T>>>,
    sourceKey: string = this.modelName,
    destinationKey: string = this.viewModelName,
  ): Promise<K> {
    return this.mapper.map(sourceKey, destinationKey, object);
  }

  async mapFromBaseModel<K>(
    object: Partial<InstanceType<T>> | Array<Partial<InstanceType<T>>>,
    sourceKey: string = this.modelName,
    destinationKey: string = this.viewModelName,
  ): Promise<K> {
    // console.log('sourceKey', sourceKey);
    // console.log('destinationKey', destinationKey);
    // console.log('object', (object as BaseModel<K>).docs);
    return this.mapper.map(sourceKey, destinationKey, (object as BaseModel<K>).docs);
  }

  async findAll(filter = {}, limit?: number, page?: number): Promise<InstanceType<T[]>> {
    return this.model.paginate(filter, { limit, page });
    // return this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<InstanceType<T>> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<InstanceType<T>> {
    return this.model.findById(this.toObjectId(id)).exec();
  }

  async create(item: InstanceType<T>): Promise<InstanceType<T>> {
    return this.model.create(item);
  }

  async delete(id: string): Promise<InstanceType<T>> {
    return this.model.findByIdAndRemove(this.toObjectId(id)).exec();
  }

  async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
    return this.model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
  }

  async clearCollection(filter = {}): Promise<any> {
    return this.model.deleteMany(filter).exec();
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
