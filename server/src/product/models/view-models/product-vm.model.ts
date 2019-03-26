import { IsString, IsInt, MinLength, IsArray, IsEnum } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { ModelVm } from '../../../shared/model';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';
import { ObjectClass } from '../../../shared/enums/object-class.enum';
import { Category } from '../../../shared/enums/category.enum';

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

  @ApiModelProperty()
  @IsInt()
  price: number;

  @ApiModelPropertyOptional()
  @IsInt()
  discountPrice: number;

  @ApiModelPropertyOptional({ enum: EnumToArray(Category) })
  @IsEnum({ enum: EnumToArray(Category) })
  categories?: Category[];

  @ApiModelProperty()
  @IsInt()
  quantity: number;

  @ApiModelPropertyOptional()
  @IsString()
  baseImage: string;

  @ApiModelPropertyOptional()
  @IsArray()
  additionalImages: string[];

  @ApiModelPropertyOptional()
  @IsArray()
  images: string[];

  @ApiModelPropertyOptional({ enum: EnumToArray(ObjectClass) })
  @IsEnum({ enum: EnumToArray(ObjectClass) })
  objectClass?: ObjectClass;
}
