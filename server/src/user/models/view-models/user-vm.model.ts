import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { BaseModelVm } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';

export class UserVm extends BaseModelVm {
  @ApiModelProperty() token: string;
  @ApiModelProperty() Email: string;
  @ApiModelProperty() FirstName?: string;
  @ApiModelProperty() LastName?: string;
  @ApiModelPropertyOptional() FullName?: string;
  @ApiModelPropertyOptional() Phone?: string;
  @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) })
  UserRole?: UserRole;
}
