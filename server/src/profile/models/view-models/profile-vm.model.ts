import { ApiModelProperty } from '@nestjs/swagger';

import { BaseModelVm } from '../../../shared/base.model';

export class ProfileVm extends BaseModelVm {
  @ApiModelProperty() content: string;
}
