import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiModelProperty({
    example: 'Product Name',
  })
  name: string;

  @ApiModelProperty({
    example: '0001',
  })
  sku: string;

  @ApiModelPropertyOptional({
    example: 'Product Description',
  })
  description: string;

  @ApiModelProperty()
  price: number;

  @ApiModelPropertyOptional()
  discountPrice: number;

  @ApiModelPropertyOptional({ type: Array, example: ['Women'] })
  categories: string[];

  @ApiModelProperty({
    example: 1,
  })
  quantity: number;

  @ApiModelPropertyOptional({
    example: '',
  })
  baseImage: string;

  @ApiModelPropertyOptional({ type: Array, example: [] })
  images: string[];
}
