import {
  Body,
  Controller, Delete, FileInterceptor,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post, Put, Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOperation, ApiOkResponse,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { isArray, map } from 'lodash';

import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { ApiException } from '../shared/api-exception.model';
import { ProductVm } from './models/view-models/product-vm.model';
import { ProductParams } from './models/view-models/product-params.model';
import { ObjectClass } from '../shared/enums/object-class.enum';
import { EnumToArray } from '../shared/utilities/enum-to-array.helper';
import { BaseModel } from '../shared/base.model';
import { Category } from '../shared/enums/category.enum';
import { SortDirection } from '../shared/enums/sort-direction.enum';
import { ParentCategory } from '../shared/enums/parent-category.enum';
import { Brand } from '../shared/enums/brand.enum';
import { Country } from '../shared/enums/country.enum';

@ApiUseTags(Product.modelName)
@Controller('products')
@ApiBearerAuth()
export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  @Post()
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({
    type: ProductVm,
    description: 'The record has been successfully created',
  })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Create Product'))
  @ApiImplicitQuery({ name: 'objectClass', enum: EnumToArray(ObjectClass) })
  @ApiImplicitQuery({ name: 'category', enum: EnumToArray(Category), required: false })
  @ApiImplicitQuery({ name: 'parentCategory', enum: EnumToArray(ParentCategory), required: false })
  @ApiImplicitQuery({ name: 'country', enum: EnumToArray(Country), required: false })
  @ApiImplicitQuery({ name: 'brand', enum: EnumToArray(Brand), required: false })
  async create(
    @Body() params: ProductParams,
    @Query('objectClass') objectClass: ObjectClass = ObjectClass.CollectionProducts,
    @Query('category') category: Category,
    @Query('parentCategory') parentCategory: ParentCategory,
    @Query('country') country: Country,
    @Query('brand') brand: Brand,
  ): Promise<ProductVm> {
    const { sku } = params;

    let productExist;

    try {
      productExist = await this.productService.findOne({ sku });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (productExist) {
      throw new HttpException(`${sku} is exist`, HttpStatus.BAD_REQUEST);
    }

    const uploadPath = `public/catalog/${sku}`;
    // Create folder if doesn't exist
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }

    const product = await this.productService.createProduct(params, objectClass, category, parentCategory, country, brand);
    return this.productService.map<ProductVm>(product);
  }

  @Get(':sku')
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({
    type: ProductVm,
    description: 'Product has been successfully found',
  })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Find product by sku'))
  async find(
    @Param('sku') sku: string,
  ): Promise<ProductVm> {
    try {
      const product = await this.productService.findOne({ sku });
      return this.productService.map<ProductVm>(product.toJSON());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get()
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: BaseModel })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Get all products'))
  // @ApiImplicitQuery({ name: 'sku', required: false })
  @ApiImplicitQuery({ name: 'page', required: false })
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiImplicitQuery({ name: 'category', enum: EnumToArray(Category), required: false, isArray: true })
  @ApiImplicitQuery({ name: 'parentCategory', enum: EnumToArray(ParentCategory), required: false, isArray: true })
  @ApiImplicitQuery({ name: 'country', enum: EnumToArray(Country), required: false, isArray: true })
  @ApiImplicitQuery({ name: 'brandName', enum: EnumToArray(Brand), required: false, isArray: true })
  @ApiImplicitQuery({
    name: 'sort',
    enum: EnumToArray(SortDirection),
    required: false,
    description: 'Sorting by price',
  })
  async get(
    // @Query('sku') sku?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: number,
    @Query('brandName') brandName?: Brand,
    @Query('country') country?: Country,
    @Query('category') category?: Category,
    @Query('parentCategory') parentCategory?: ParentCategory,
    @Query('sort') sort?: SortDirection,
  ): Promise<BaseModel<ProductVm[]>> {
    let filter = {};
    const sortOptions = SortDirection;

    try {
      let products;

      if (filter) {
        if (category) {
          filter['category'] = { $in: isArray(category) ? [...category] : [category] };
        }

        if (parentCategory) {
          if (filter['category']) {
            filter = { $and: [{ category: filter['category'] }, { parentCategory }] };
          } else {
            filter['parentCategory'] = parentCategory;
          }
        }

        if (brandName) {
          filter['brandName'] = { $in: isArray(brandName) ? [...brandName] : [brandName] };
        }

        if (country) {
          filter['country'] = { $in: isArray(country) ? [...country] : [country] };
        }

        products = await this.productService.findAll(filter,
          limit ? parseFloat(limit) : 10,
          page ? page : 1,
          sort === sortOptions.ASC ? { price: sortOptions.ASC } :
            sort === sortOptions.DESC ? { price: sortOptions.DESC } :
              {},
        );

      }

      if (filter === null) {
        products = await this.productService.findAll({},
          limit ? parseFloat(limit) : 10,
          page ? page : 1,
          sort === sortOptions.ASC ? { price: sortOptions.ASC } :
            sort === sortOptions.DESC ? { price: sortOptions.DESC } :
              {},
        );
      }

      return this.productService.map<BaseModel<ProductVm[]>>(products);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @Delete(':id')
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: ProductVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<ProductVm> {
    try {
      const deleted = await this.productService.delete(id);
      return this.productService.map<ProductVm>(deleted.toJSON());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Delete('clear-collection')
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({ type: ProductVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Clear Products Collection'))
  async clear(): Promise<ProductVm[]> {
    try {
      return await this.productService.clearCollection();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Put()
  @ApiOkResponse({ type: ProductVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Product Update'))
  @ApiImplicitQuery({ name: 'objectClass', enum: EnumToArray(ObjectClass), required: false })
  @ApiImplicitQuery({ name: 'additionalImages', required: false, isArray: true })
  @ApiImplicitQuery({ name: 'baseImage', required: false })
  @ApiImplicitQuery({ name: 'quantity', required: false })
  @ApiImplicitQuery({ name: 'category', enum: EnumToArray(Category), required: false })
  @ApiImplicitQuery({ name: 'parentCategory', enum: EnumToArray(ParentCategory), required: false })
  @ApiImplicitQuery({ name: 'brandName', enum: EnumToArray(Brand), required: false })
  @ApiImplicitQuery({ name: 'country', enum: EnumToArray(Country), required: false })
  @ApiImplicitQuery({ name: 'discountPrice', required: false })
  @ApiImplicitQuery({ name: 'price', required: false })
  @ApiImplicitQuery({ name: 'shortDescription', required: false })
  @ApiImplicitQuery({ name: 'description', required: false })
  @ApiImplicitQuery({ name: 'name', required: false })
  @ApiImplicitQuery({ name: 'sku', required: false })
  @ApiImplicitQuery({ name: 'id', required: true })
  async update(
    @Query('additionalImages') additionalImages,
    @Query('baseImage') baseImage: string,
    @Query('quantity') quantity: number,
    @Query('category') category: Category,
    @Query('parentCategory') parentCategory: ParentCategory,
    @Query('discountPrice') discountPrice: number,
    @Query('price') price: number,
    @Query('description') description: string,
    @Query('shortDescription') shortDescription: string,
    @Query('brandName') brandName: Brand,
    @Query('country') country: Country,
    @Query('name') name: string,
    @Query('objectClass') objectClass: ObjectClass,
    @Query('sku') sku: string,
    @Query('id') id: string,
  ): Promise<ProductVm> {
    const vm: ProductVm = {
      id,
      sku,
      objectClass,
      name,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      parentCategory,
      quantity,
      baseImage,
      additionalImages,
      images: [],
      urlKey: '',
      attributes: [],
      brandName,
      country,
    };

    if (!vm || !id) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const exist = await this.productService.findById(id);

    if (!vm) {
      throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
    }

    if (vm.name) {
      exist.name = name;
      vm.urlKey = `${name.toLowerCase().replace(/\s/g, '-')}-${sku}`;
    }
    if (vm.objectClass) {
      exist.objectClass = objectClass;
    }
    if (vm.quantity) {
      exist.quantity = quantity;
    }
    if (vm.price) {
      exist.price = price;
    }
    if (vm.discountPrice) {
      exist.discountPrice = discountPrice;
    }
    if (vm.category) {
      exist.category = category;
    }
    if (vm.parentCategory) {
      exist.parentCategory = parentCategory;
    }

    if (vm.baseImage) {
      exist.baseImage = `public/catalog/${sku}/${baseImage}`;
      exist.images.push(exist.baseImage);
    }
    if (vm.description) {
      exist.description = description;
    }
    if (vm.brandName) {
      exist.brandName = brandName;
    }
    if (vm.country) {
      exist.country = country;
    }
    if (vm.shortDescription) {
      exist.shortDescription = shortDescription;
    }
    if (vm.additionalImages) {
      exist.additionalImages = [];

      exist.additionalImages = additionalImages.split(',').map(img => {
        const addImg = `public/catalog/${sku}/${img}`;
        exist.images.push(addImg);
        return addImg;
      });
    }

    try {
      return await this.productService.update(id, exist);
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
