import { Controller, Delete, Get, InternalServerErrorException, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
  ApiCreatedResponse,
  ApiImplicitQuery,
} from '@nestjs/swagger';

import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { UserVm } from './models/view-models/user-vm.model';
import { BaseModel } from '../shared/base.model';

@Controller('users')
@ApiUseTags(User.modelName)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UserService) {
  }

  @Delete('clear-collection')
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({ type: UserVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'ClearUsersCollection'))
  async clear(): Promise<UserVm[]> {
    try {
      return await this.userService.clearCollection();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get()
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: BaseModel })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'id', required: false })
  async get(
    @Query('id') id?: string,
  ): Promise<BaseModel<UserVm[]>> {

    try {
      const users = await this.userService.findAll();
      return this.userService.map<BaseModel<UserVm[]>>(users);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
