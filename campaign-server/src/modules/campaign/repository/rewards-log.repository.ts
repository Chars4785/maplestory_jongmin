import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { RewardLogEntity } from '../entities/reward-log.entity';

@Injectable()
export class RewardLogRepository extends BaseRepository<RewardLogEntity> {
  constructor(
    @InjectModel(RewardLogEntity.name)
    private rewardLogModel: Model<RewardLogEntity>,
  ) {
    super(rewardLogModel);
  }
}
