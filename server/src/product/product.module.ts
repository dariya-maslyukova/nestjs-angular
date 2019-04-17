import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as  mongoosePaginate from 'mongoose-paginate-v2';

import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { ProductController } from './product.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Product.modelName, schema: Product.model.schema.plugin(mongoosePaginate) },
  ])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
