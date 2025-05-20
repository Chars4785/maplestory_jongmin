import { StrictBuilder } from 'builder-pattern';
import { CampaignEntity } from '../../entities/campaign.entity';
import { RewardCondition } from '../../types/reward-condition.type';
import { ParticipationDto } from '../participation/participation.dto';
import { RewardDto } from '../reward/reward.dto';

export class CampaignDto {
  id: string;
  autoReward: boolean;
  rewardId: string;
  condition: RewardCondition;
  creatorId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  rewards: RewardDto;
  participators: ParticipationDto[];

  static fromEntity(entity: CampaignEntity): CampaignDto {
    return StrictBuilder<CampaignDto>()
      .id(entity._id?.toString() ?? '')
      .autoReward(entity.autoReward)
      .rewardId(entity.rewardId)
      .condition(entity.condition)
      .creatorId(entity.creatorId)
      .startDate(entity.startDate)
      .endDate(entity.endDate)
      .status(entity.status)
      .rewards(RewardDto.fromEntity(entity.rewards))
      .participators(
        entity.participators.map((p) => ParticipationDto.fromEntity(p)),
      )
      .build();
  }
}
