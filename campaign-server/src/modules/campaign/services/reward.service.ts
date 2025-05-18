import { Injectable } from '@nestjs/common';
import { RewardRepository } from '../repository/reward.repository';

@Injectable()
export class RewardService {
  constructor(private readonly rewardRepository: RewardRepository) {}
}
