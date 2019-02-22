import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class ApiException {
  @ApiModelPropertyOptional() statusCode?: string;
  @ApiModelPropertyOptional() message?: string;
  @ApiModelPropertyOptional() status?: string;
  @ApiModelPropertyOptional() error?: string;
  @ApiModelPropertyOptional() errors?: any;
  @ApiModelPropertyOptional() timestamp?: string;
  @ApiModelPropertyOptional() path?: string;
}