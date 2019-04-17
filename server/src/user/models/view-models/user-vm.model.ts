import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

import { ModelVm } from '../../../shared/model';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { EnumToArray } from '../../../shared/utilities/enum-to-array.helper';

export class UserVm extends ModelVm {
  @ApiModelProperty()
  @IsString()
  token: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @ApiModelProperty()
  @IsString()
  FirstName?: string;

  @ApiModelProperty()
  @IsString()
  LastName?: string;

  @ApiModelPropertyOptional()
  FullName?: string;

  @ApiModelPropertyOptional()
  @IsPhoneNumber('UA', { message: 'Phone must be from Ukraine provider and started on 380' })
  Phone?: string;

  @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) })
  @IsEnum({ enum: EnumToArray(UserRole) })
  UserRole?: UserRole;
}
