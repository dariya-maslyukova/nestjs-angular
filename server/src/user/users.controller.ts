import {
  Body,
  Controller, Delete,
  Get,
  HttpException,
  HttpStatus, InternalServerErrorException, Post, Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
  ApiCreatedResponse,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { map } from 'lodash';

import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { UserVm } from './models/view-models/user-vm.model';
import { TodoVm } from '../todo/models/view-models/todo-vm.model';
import { Todo } from '../todo/models/todo.model';

@Controller('users')
@ApiUseTags(User.modelName)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly userService: UserService) {
  }

  @Delete('clear-collection')
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiCreatedResponse({ type: TodoVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Todo.modelName, 'ClearUsersCollection'))
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
  @ApiOkResponse({ type: UserVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'id', required: false })
  async get(
    @Query('id') id?: string,
  ): Promise<UserVm[]> {

    try {
      const users = await this.userService.findAll();
      return this.userService.map<UserVm[]>(map(users, user => user.toJSON()));
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
