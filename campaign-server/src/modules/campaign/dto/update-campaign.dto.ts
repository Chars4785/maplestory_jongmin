import { IsBoolean, IsDate, IsEnum, IsObject } from 'class-validator';
import { RewardCondition } from '../types/reward-condition.type';
import { RewardType } from '../types/reward-type.enum';

export class UpdateCampaignDto {
  @IsBoolean()
  autoReward: boolean;

  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsObject()
  condition: RewardCondition;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
