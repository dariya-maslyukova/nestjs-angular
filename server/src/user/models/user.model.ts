import { InstanceType, ModelType, prop } from 'typegoose';
import { Model, schemaOptions } from '../../shared/model';
import { UserRole } from '../../shared/enums/user-role.enum';

export class User extends Model<User> {
  @prop()
  success?: boolean;

  @prop()
  message?: string;

  @prop({
    unique: true,
    required: true,
  })
  Email: string;

  @prop({
    required: [true, 'Password is required'],
    minlength: [6, 'Must be at least 6 characters'],
  })
  Password: string;

  @prop()
  FirstName?: string;

  @prop()
  LastName?: string;

  @prop()
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
