import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';

import { ApiException } from '../shared/api-exception.model';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { UserVm } from './models/view-models/user-vm.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';

@Controller('user')
@ApiUseTags(User.modelName)
export class UserController {

  constructor(private readonly userService: UserService) {

  }

  @Post('register')
  @ApiCreatedResponse({ type: UserVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'Register'))
  async register(@Body() registerVm: RegisterVm): Promise<UserVm> {
    const { email, password, firstName, lastName } = registerVm;

    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }

    if (!firstName) {
      throw new HttpException('FirstName is required', HttpStatus.BAD_REQUEST);
    }

    if (!lastName) {
      throw new HttpException('LastName is required', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    let exist;

    try {
      exist = await this.userService.findOne({ email });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (exist) {
      throw new HttpException(`${email} is exist`, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.register(registerVm);
    return this.userService.map<UserVm>(newUser);
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponseVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'Login'))
  async login(@Body() loginVm: LoginVm): Promise<LoginResponseVm> {
    const fields = Object.keys(loginVm);
    fields.forEach(field => {
      if (!loginVm[field]) {
        throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
      }
    });

    return this.userService.login(loginVm);
  }
}
