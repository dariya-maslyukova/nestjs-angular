import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.modelName, schema: User.model.schema }])],
  controllers: [UserController, UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
