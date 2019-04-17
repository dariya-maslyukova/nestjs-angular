import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';

import { Product } from './models/product.model';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { ProductParams } from './models/view-models/product-params.model';
import { ObjectClass } from '../shared/enums/object-class.enum';
import { Category } from '../shared/enums/category.enum';
import { ParentCategory } from '../shared/enums/parent-category.enum';
import { Country } from '../shared/enums/country.enum';
import { Brand } from '../shared/enums/brand.enum';

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

  async createProduct(
    params: ProductParams,
    objectClass: ObjectClass,
    category: Category,
    parentCategory: ParentCategory,
    country: Country,
    brandName: Brand,
  ): Promise<Product> {
    const {
      name,
      price,
      quantity,
      sku,
      baseImage,
      description,
      shortDescription,
      discountPrice,
      additionalImages,
    } = params;

    const product = Product.createModel();

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.sku = sku;
    product.objectClass = objectClass;

    if (category) {
      product.category = category;
    }
    if (parentCategory) {
      product.parentCategory = parentCategory;
    }
    if (brandName) {
      product.brandName = brandName;
    }
    if (country) {
      product.country = country;
    }
    if (shortDescription) {
      product.shortDescription = shortDescription;
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
