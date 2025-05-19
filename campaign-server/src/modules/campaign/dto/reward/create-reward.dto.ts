import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RewardType } from '../../entities/rewards.entity';

export class CreateRewardDto {
  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;
}
