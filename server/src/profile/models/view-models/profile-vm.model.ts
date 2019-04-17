import { ApiModelProperty } from '@nestjs/swagger';

import { ModelVm } from '../../../shared/model';

export class ProfileVm extends ModelVm {
  @ApiModelProperty() content: string;
}
