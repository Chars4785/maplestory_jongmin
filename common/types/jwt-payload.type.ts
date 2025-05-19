import { RoleType } from "./role.type";

export type JwtPayload = {
  username: string;
  role: RoleType;
  accountId: string;
};
