import { UserRole } from '../../user/models/user-role.enum';

export interface JwtPayload {
  Email: string;
  UserRole: UserRole;
  iat?: Date;
}
