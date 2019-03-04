import { ApiModelProperty } from '@nestjs/swagger';

export class LoginVm {
  @ApiModelProperty() UserName: string;
  @ApiModelProperty() Password: string;
}
