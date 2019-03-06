import { ApiModelProperty } from '@nestjs/swagger';

export class LoginVm {
  @ApiModelProperty() Email: string;
  @ApiModelProperty() Password: string;
}
