import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { BaseModelVm } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';

export class UserVm extends BaseModelVm {
  @ApiModelProperty() UserName: string;
  @ApiModelPropertyOptional() FirstName?: string;
  @ApiModelPropertyOptional() LastName?: string;
  @ApiModelPropertyOptional() FullName?: string;
  @ApiModelPropertyOptional() PhoneNumber?: string;
  @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) })
  UserRole?: UserRole;
}
