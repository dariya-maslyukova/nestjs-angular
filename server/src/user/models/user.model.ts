import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { UserRole } from './user-role.enum';

export class User extends BaseModel<User> {
  @prop() success?: boolean;
  @prop() message?: string;

  @prop({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Must be at least 6 characters' })
  Password: string;

  @IsNotEmpty()
  FirstName?: string;

  @IsNotEmpty()
  LastName?: string;

  @IsPhoneNumber('UA', { message: 'Phone must be from Ukraine provider and started on 380' })
  Phone?: string;

  @prop({
    enum: UserRole,
    default: UserRole.User,
  }) UserRole?: UserRole;

  @prop()
  get FullName(): string {
    return `${this.FirstName} ${this.LastName}`;
  }

  static get model(): ModelType<User> {
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<User> {
    return new this.model();
  }
}
