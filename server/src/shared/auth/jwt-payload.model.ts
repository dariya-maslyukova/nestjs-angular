import { UserRole } from '../enums/user-role.enum';

export interface JwtPayload {
  email: string;
  userRole: UserRole;
  iat?: Date;
}
