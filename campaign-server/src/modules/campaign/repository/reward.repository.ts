import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { RewardEntity } from '../entities/rewards.entity';

@Injectable()
export class RewardRepository extends BaseRepository<RewardEntity> {
  constructor(
    @InjectModel(RewardEntity.name)
    private rewardModel: Model<RewardEntity>,
  ) {
    super(rewardModel);
  }
}
