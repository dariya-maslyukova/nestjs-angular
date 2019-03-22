import { IsString, IsInt, MinLength, IsArray, IsEnum } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { ModelVm } from '../../../shared/model';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';
import { ObjectClass } from '../../../shared/enums/object-class.enum';

export class ProductVm extends ModelVm {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @MinLength(5, { message: 'SKU must contain 5 numbers and be unique' })
  readonly sku: number;

  @ApiModelPropertyOptional()
  @IsString()
  readonly description: string;

  @ApiModelProperty()
  @IsInt()
  readonly price: number;

  @ApiModelPropertyOptional()
  @IsInt()
  readonly discountPrice: number;

  @ApiModelPropertyOptional()
  @IsString()
  readonly categories: string[];

  @ApiModelProperty()
  @IsInt()
  readonly quantity: number;

  @ApiModelPropertyOptional()
  @IsString()
  readonly baseImage: string;

  @ApiModelPropertyOptional()
  @IsArray()
  readonly additionalImages: string[];

  @ApiModelPropertyOptional()
  @IsArray()
  readonly images: string[];

  @ApiModelPropertyOptional({ enum: EnumToArray(ObjectClass) })
  @IsEnum({ enum: EnumToArray(ObjectClass) })
  readonly objectClass?: ObjectClass;
}