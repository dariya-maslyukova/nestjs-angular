import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class SliderParams {
  @ApiModelPropertyOptional() Link: string;
  @ApiModelPropertyOptional() TopText: string;
  @ApiModelPropertyOptional() BoldText: string;
  @ApiModelPropertyOptional() BotText: string;
  @ApiModelPropertyOptional() CaptionText: string;
  @ApiModelPropertyOptional() IsActive: boolean;
}
