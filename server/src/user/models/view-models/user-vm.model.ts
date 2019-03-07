import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { BaseModelVm } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';

export class UserVm extends BaseModelVm {
  @ApiModelProperty() email: string;
  @ApiModelProperty() firstName?: string;
  @ApiModelProperty() lastName?: string;
  @ApiModelPropertyOptional() fullName?: string;
  @ApiModelPropertyOptional() phone?: string;
  @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) })
  userRole?: UserRole;
}
