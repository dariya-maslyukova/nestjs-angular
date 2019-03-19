import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { ProductController } from './product.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.modelName, schema: Product.model.schema }])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
