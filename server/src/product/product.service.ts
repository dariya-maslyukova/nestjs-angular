import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';

import { Product } from './models/product.model';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { ProductParams } from './models/view-models/product-params.model';
import { ObjectClass } from '../shared/enums/object-class.enum';

@Injectable()
export class ProductService extends BaseService<Product> {

  constructor(
    @InjectModel(Product.modelName) private readonly productModel: ModelType<Product>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this.model = productModel;
    this.mapper = mapperService.mapper;
  }

  async createProduct(params: ProductParams, objectClass: ObjectClass): Promise<Product> {
    const { name, price, quantity, sku, categories, baseImage, description, discountPrice, additionalImages } = params;

    const product = Product.createModel();

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.sku = sku;
    product.objectClass = objectClass;

    if (categories) {
      product.categories = categories;
    }
    if (baseImage) {
      product.baseImage = `public/catalog/${sku}/${baseImage}`;
    }
    if (description) {
      product.description = description;
    }
    if (discountPrice) {
      product.discountPrice = discountPrice;
    }
    if (additionalImages) {
      product.additionalImages = additionalImages.map(img => {
        return `public/catalog/${sku}/${img}`;
      });
    }

    try {
      const result = await this.create(product);
      return result.toJSON() as Product;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
