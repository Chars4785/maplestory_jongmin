import {
  IsBoolean,
  IsDate,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { RewardCondition } from '../../types/reward-condition.type';

export class UpdateCampaignDto {
  @IsBoolean()
  @IsOptional()
  autoReward?: boolean;

  @IsString()
  @IsOptional()
  rewardId?: string;

  @IsObject()
  @IsOptional()
  condition?: RewardCondition;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}
