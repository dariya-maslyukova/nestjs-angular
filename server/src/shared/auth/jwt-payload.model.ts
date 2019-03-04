import { UserRole } from '../../user/models/user-role.enum';

export interface JwtPayload {
  UserName: string;
  UserRole: UserRole;
  iat?: Date;
}
