export type Account = {
  loginId: string;
  password: string;
  lastLoginAt?: Date;
  achievements: string[];
  invitedFriendCount: number;
};
