import {
  Body,
  Controller, Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post, Query,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOperation, ApiOkResponse,
  ApiImplicitQuery } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { map } from 'lodash';

import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { ApiException } from '../shared/api-exception.model';
import { ProductVm } from './models/view-models/product-vm.model';
import { ProductParams } from './models/view-models/product-params.model';

@ApiUseTags(Product.modelName)
@Controller('product')
@ApiBearerAuth()
export class ProductController {

  constructor( private readonly productService: ProductService ) {
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
  async create(
    @Body() params: ProductParams,
    @UploadedFile() file,
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

    const product = await this.productService.createProduct(params);
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
    @Param('sku') sku: number,
  ): Promise<ProductVm> {
    try {
      const product = await this.productService.findOne({ sku }) ;
      return this.productService.map<ProductVm>(product.toJSON());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get()
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: ProductVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Get all products'))
  @ApiImplicitQuery({ name: 'sku', required: false })
  async get(
    @Query('sku') sku?: string,
  ): Promise<ProductVm[]> {

    try {
      const products = await this.productService.findAll();
      return this.productService.map<ProductVm[]>(map(products, product => product.toJSON()));
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
}
