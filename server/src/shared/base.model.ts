import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Model } from './model';

export abstract class BaseModel<T> {
  @ApiModelPropertyOptional()
  docs?: Model<T>;

  @ApiModelPropertyOptional()
  totalDocs?: number;

  @ApiModelPropertyOptional()
  limit?: number;

  @ApiModelPropertyOptional()
  hasPrevPage?: boolean;

  @ApiModelPropertyOptional()
  hasNextPage?: boolean;

  @ApiModelPropertyOptional()
  page?: number;

  @ApiModelPropertyOptional()
  totalPages?: number;

  @ApiModelPropertyOptional()
  offset?: number;

  @ApiModelPropertyOptional()
  pagingCounter?: number;

  @ApiModelPropertyOptional()
  prevPage?: number;

  @ApiModelPropertyOptional()
  nextPage?: number;
}
