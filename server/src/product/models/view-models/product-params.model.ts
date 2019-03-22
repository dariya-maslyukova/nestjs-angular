import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ProductParams {
  @ApiModelProperty({
    example: 'Product Name',
  })
  name: string;

  @ApiModelProperty({
    example: 10000,
  })
  sku: number;

  @ApiModelPropertyOptional({
    example: 'Product Description',
  })
  description: string;

  @ApiModelProperty()
  price: number;

  @ApiModelPropertyOptional()
  discountPrice: number;

  @ApiModelProperty({
    example: 1,
  })
  quantity: number;

  @ApiModelPropertyOptional({
    description: 'Just file name',
    example: '',
  })
  baseImage: string;

  @ApiModelPropertyOptional({
    description: 'Just file names in array',
    type: Array,
    example: [],
  })
  additionalImages: string[];
}
