import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';

export class RegisterVm extends LoginVm {
  @ApiModelProperty() FirstName: string;
  @ApiModelProperty() LastName: string;
  @ApiModelPropertyOptional() Phone: string;
}
