import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { ModelType } from 'typegoose';

import { AuthService } from '../shared/auth/auth.service';
import { JwtPayload } from '../shared/auth/jwt-payload.model';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { User } from './models/user.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { UserVm } from './models/view-models/user-vm.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
    private readonly mapperService: MapperService,
    @Inject(forwardRef(() => AuthService))
    readonly authService: AuthService,
  ) {
    super();
    this.model = userModel;
    this.mapper = mapperService.mapper;
  }

  async register(vm: RegisterVm) {
    const { email, password, firstName, lastName, phone } = vm;

    const newUser = User.createModel();
    newUser.email = email.trim().toLowerCase();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.phone = phone;

    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);

    try {
      const result = await this.create(newUser);
      // return result.toJSON() as User;

      return {
        success: true,
        message: 'Registration successful, please Sign in!',
        user: result.toJSON() as User,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(vm: LoginVm): Promise<LoginResponseVm> {
    const { email, password } = vm;

    const user = await this.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
    }

    const payload: JwtPayload = {
      email: user.email,
      userRole: user.userRole,
    };

    const token = await this.authService.signPayLoad(payload);
    const userVm: UserVm = await this.map<UserVm>(user.toJSON());

    return {
      success: true,
      message: 'Login successful',
      token,
      user: userVm,
    };
  }
}
