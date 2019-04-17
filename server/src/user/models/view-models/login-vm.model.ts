import { ApiModelProperty } from '@nestjs/swagger';

export class LoginVm {
  @ApiModelProperty({ required: true }) Email: string;
  @ApiModelProperty({ required: true, minLength: 6, type: String, format: 'password' }) Password: string;
}
