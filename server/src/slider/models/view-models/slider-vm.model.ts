import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';

export class SliderVm extends BaseModelVm {
  @ApiModelPropertyOptional() Link: string;
  @ApiModelPropertyOptional() TopText: string;
  @ApiModelPropertyOptional() BoldText: string;
  @ApiModelPropertyOptional() BotText: string;
  @ApiModelPropertyOptional() CaptionText: string;
  @ApiModelPropertyOptional() IsActive: boolean;
}
