import { IsString, IsInt, MinLength, IsArray, IsEnum } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { ModelVm } from '../../../shared/model';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';
import { ObjectClass } from '../../../shared/enums/object-class.enum';
import { Category } from '../../../shared/enums/category.enum';
import { ParentCategory } from '../../../shared/enums/parent-category.enum';
import { Country } from '../../../shared/enums/country.enum';
import { Brand } from '../../../shared/enums/brand.enum';
import { Attribute } from '../../interfaces/attribute.interface';

export class ProductVm extends ModelVm {
  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty()
  @MinLength(6, { message: 'SKU must contain 6 letters and be unique' })
  sku: string;

  @ApiModelPropertyOptional()
  @IsString()
  description: string;

  @ApiModelPropertyOptional()
  @IsString()
  shortDescription: string;

  @ApiModelProperty()
  @IsInt()
  price: number;

  @ApiModelPropertyOptional()
  @IsInt()
  discountPrice: number;

  @ApiModelPropertyOptional({ enum: EnumToArray(Category) })
  @IsEnum({ enum: EnumToArray(Category) })
  category?: Category;

  @ApiModelPropertyOptional({ enum: EnumToArray(ParentCategory) })
  @IsEnum({ enum: EnumToArray(ParentCategory) })
  parentCategory?: ParentCategory;

  @ApiModelPropertyOptional({ enum: EnumToArray(Country) })
  @IsEnum({ enum: EnumToArray(Country) })
  country?: Country;

  @ApiModelPropertyOptional({ enum: EnumToArray(Brand) })
  @IsEnum({ enum: EnumToArray(Brand) })
  brandName?: Brand;

  @ApiModelProperty()
  @IsInt()
  quantity: number;

  @ApiModelPropertyOptional()
  @IsArray()
  attributes: Attribute[];

  @ApiModelPropertyOptional()
  @IsString()
  baseImage: string;

  @ApiModelPropertyOptional({ example: ['image-1.jpg', 'image-2.jpg'] })
  @IsArray()
  additionalImages?: string[];

  @ApiModelPropertyOptional()
  @IsArray()
  images: string[];

  @ApiModelPropertyOptional({ enum: EnumToArray(ObjectClass) })
  @IsEnum({ enum: EnumToArray(ObjectClass) })
  objectClass?: ObjectClass;

  @ApiModelPropertyOptional()
  @IsString()
  urlKey?: string;
}
