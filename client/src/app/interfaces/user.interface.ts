import { Model } from './model.interface';

export interface User extends Model {
  Email: string;
  Token: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  UserRole: string;
  Phone: string;
}
