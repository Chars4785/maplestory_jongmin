import { IsBoolean, IsDate, IsEnum, IsObject, IsString } from 'class-validator';
import { RewardCondition } from '../types/reward-condition.type';
import { RewardType } from '../types/reward-type.enum';

export class CreateCampaignDto {
  @IsBoolean()
  autoReward: boolean;

  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsObject()
  condition: RewardCondition;

  @IsString()
  creatorId: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
