import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { UserRole } from './user-role.enum';

export class User extends BaseModel<User> {
  @prop({
    required: [true, 'Email is required'],
    unique: true,
  }) Email: string;

  @prop({
    required: [true, 'Password is required'],
    minlength: [6, 'Must be at least 6 characters'],
  }) Password: string;

  @prop({
    required: [true, 'First Name is required'],
  }) FirstName?: string;

  @prop({
    required: [true, 'Last Name is required'],
  }) LastName?: string;

  @prop() Phone?: string;

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
