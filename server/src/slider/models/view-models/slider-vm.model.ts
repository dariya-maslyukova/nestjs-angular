import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ModelVm } from '../../../shared/model';

export class SliderVm extends ModelVm {
  @ApiModelPropertyOptional() Link: string;
  @ApiModelPropertyOptional() TopText: string;
  @ApiModelPropertyOptional() BoldText: string;
  @ApiModelPropertyOptional() BotText: string;
  @ApiModelPropertyOptional() CaptionText: string;
  @ApiModelPropertyOptional() IsActive: boolean;
}
