import { IsBoolean, IsDate, IsObject, IsString } from 'class-validator';
import { RewardCondition } from '../../types/reward-condition.type';

export class CreateCampaignDto {
  @IsBoolean()
  autoReward: boolean;

  @IsString()
  rewardId: string;

  @IsObject()
  condition: RewardCondition;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
