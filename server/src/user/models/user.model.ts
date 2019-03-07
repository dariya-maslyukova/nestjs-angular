import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { UserRole } from './user-role.enum';

export class User extends BaseModel<User> {
  @prop() success?: boolean;
  @prop() message?: string;
  @prop({
    required: [true, 'Email is required'],
    unique: true,
  }) email: string;

  @prop({
    required: [true, 'Password is required'],
    minlength: [6, 'Must be at least 6 characters'],
  }) password: string;

  @prop({
    required: [true, 'First Name is required'],
  }) firstName?: string;

  @prop({
    required: [true, 'Last Name is required'],
  }) lastName?: string;

  @prop() phone?: string;

  @prop({
    enum: UserRole,
    default: UserRole.User,
  }) userRole?: UserRole;

  @prop()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
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
