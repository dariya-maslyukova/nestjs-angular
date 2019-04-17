import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';

export class RegisterVm extends LoginVm {
  @ApiModelProperty({ example: 'John' }) FirstName: string;
  @ApiModelProperty({ example: 'Doe' }) LastName: string;
  @ApiModelPropertyOptional() Phone: string;
}
