import { RoleType } from '../../../auth/types/role.type';

export class JwtPayload {
  username: string;
  role: RoleType;
  accountId: string;
}
