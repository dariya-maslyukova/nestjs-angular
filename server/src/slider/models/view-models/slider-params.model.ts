import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class SliderParams {
  @ApiModelProperty() Image: string;
  @ApiModelPropertyOptional() Link: string;
  @ApiModelPropertyOptional() TopText: string;
  @ApiModelPropertyOptional() BoldText: string;
  @ApiModelPropertyOptional() BotText: string;
  @ApiModelPropertyOptional() CaptionText: string;
  @ApiModelPropertyOptional() IsActive: boolean;
}
