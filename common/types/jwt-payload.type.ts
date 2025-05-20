import { Role } from "./role.type";

export type JwtPayload = {
  role: Role;
  accountId: string;
};
