// 최근 3일 로그인
export class RecentThreeDayLoginCondition {
  accountId: string;
  startDate: Date;
  endDate: Date;
}

// 친구 초대 횟수
export class InvitedFriendCountCondition {
  accountId: string;
  invitedCount: number;
}

// 업적 달성 체크
export class ClearQuestCondition {
  accountId: string;
  questId: string;
}

export type RewardCondition =
  | RecentThreeDayLoginCondition
  | InvitedFriendCountCondition
  | ClearQuestCondition;
