import { UserVm } from './user-vm.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponseVm {
  @ApiModelProperty() success: boolean;
  @ApiModelProperty() message: string;
  @ApiModelProperty({ type: UserVm }) user: UserVm;
}
