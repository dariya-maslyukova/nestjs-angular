import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';

export class RegisterVm extends LoginVm {
  @ApiModelPropertyOptional() FirstName: string;
  @ApiModelPropertyOptional() LastName: string;
  @ApiModelPropertyOptional() PhoneNumber: string;
}
