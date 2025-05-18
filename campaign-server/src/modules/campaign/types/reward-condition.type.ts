// 최근 3일 로그인
export type RecentThreeDayLoginCondition = {
  accountId: string;
  startDate: Date;
  endDate: Date;
};

// 친구 초대 횟수
export type InvitedFriendCountCondition = {
  accountId: string;
  invitedCount: number;
};

// 업적 달성 체크
export type ClearQuestCondition = {
  accountId: string;
  questId: string;
};

export type RewardCondition =
  | RecentThreeDayLoginCondition
  | InvitedFriendCountCondition
  | ClearQuestCondition;
