import { StrictBuilder } from 'builder-pattern';
import { RewardLogEntity } from '../../entities/reward-log.entity';

export class RewardLogDto {
  campaignId: string;
  rewardedAccountId: string;
  rewardId: string;
  executedAccountId: string;

  static fromEntity(entity: RewardLogEntity): RewardLogDto {
    return StrictBuilder<RewardLogDto>()
      .campaignId(entity.campaignId)
      .rewardedAccountId(entity.rewardedAccountId)
      .rewardId(entity.rewardId)
      .executedAccountId(entity.executedAccountId)
      .build();
  }
}
