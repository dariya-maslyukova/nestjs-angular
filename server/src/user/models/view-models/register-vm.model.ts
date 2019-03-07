import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';

export class RegisterVm extends LoginVm {
  @ApiModelProperty({ example: 'John' }) firstName: string;
  @ApiModelProperty({ example: 'Doe' }) lastName: string;
  @ApiModelPropertyOptional() phone: string;
}
