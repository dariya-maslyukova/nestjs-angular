import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { SchemaOptions } from 'mongoose';
import { Typegoose, prop, pre } from 'typegoose';

export class ModelVm {
  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  createdAt?: Date;

  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  updatedAt?: Date;

  @ApiModelPropertyOptional()
  id?: string;
}

// @ts-ignore
@pre<T>('findOneAndUpdate', function() {
  this._update.updatedAt = new Date(Date.now());
})
export abstract class Model<T> extends Typegoose  {
  @prop()
  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  createdAt: Date;

  @prop()
  @ApiModelPropertyOptional({ type: String, format: 'date-time' })
  updatedAt: Date;

  @ApiModelPropertyOptional()
  id: string;
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  autoIndex: false,
  toJSON: {
    virtuals: true,
    getters: true,
  },
};
