import { StrictBuilder } from 'builder-pattern';
import { RewardEntity } from '../../entities/rewards.entity';

export class RewardDto {
  id: string;
  rewardType: string;
  amount: number;
  description: string;

  static fromEntity(entity: RewardEntity) {
    return StrictBuilder<RewardDto>()
      .id(entity.id)
      .rewardType(entity.rewardType)
      .amount(entity.amount)
      .description(entity.description)
      .build();
  }
}
