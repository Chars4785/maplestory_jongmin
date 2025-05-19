import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RewardType } from '../../entities/rewards.entity';

export class UpdateRewardDto {
  @IsEnum(RewardType)
  @IsOptional()
  rewardType?: RewardType;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
