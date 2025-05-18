import { StrictBuilder } from 'builder-pattern';
import { CampaignEntity } from '../entities/campaign.entity';
import { RewardCondition } from '../types/reward-condition.type';
import { RewardType } from '../types/reward-type.enum';

export class CampaignDto {
  autoReward: boolean;
  rewardType: RewardType;
  condition: RewardCondition;
  creatorId: string;
  startDate: Date;
  endDate: Date;
  status: string;

  static fromEntity(entity: CampaignEntity): CampaignDto {
    return StrictBuilder<CampaignDto>()
      .autoReward(entity.autoReward)
      .rewardType(entity.rewardType)
      .condition(entity.condition)
      .creatorId(entity.creatorId)
      .startDate(entity.startDate)
      .endDate(entity.endDate)
      .status(entity.status)
      .build();
  }
}
