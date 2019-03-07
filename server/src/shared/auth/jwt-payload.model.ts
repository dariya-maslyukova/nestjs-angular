import { UserRole } from '../../user/models/user-role.enum';

export interface JwtPayload {
  email: string;
  userRole: UserRole;
  iat?: Date;
}
