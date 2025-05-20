import { Role } from "./role.type";

export type AuthUserDto = {
  accountId: string;
  role: Role;
};
