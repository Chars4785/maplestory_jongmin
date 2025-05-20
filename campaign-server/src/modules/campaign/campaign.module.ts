import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthApiService } from '../api/service/auth-api.service';
import { CampaignController } from './controllers/campaign.controller';
import { ParticipationController } from './controllers/participation.controller';
import { RewardController } from './controllers/reward.controller';
import { CampaignEntity, CampaignSchema } from './entities/campaign.entity';
import {
  ParticipationEntity,
  ParticipationSchema,
} from './entities/participation.entity';
import {
  RewardLogEntity,
  RewardsLogSchema,
} from './entities/reward-log.entity';
import { RewardEntity, RewardSchema } from './entities/rewards.entity';
import { CampaignRepository } from './repository/campaign.repository';
import { ParticipationRepository } from './repository/participation.repository';
import { RewardRepository } from './repository/reward.repository';
import { RewardLogRepository } from './repository/rewards-log.repository';
import { CampaignService } from './services/campaign.service';
import { ParticipationService } from './services/participation.service';
import { RewardService } from './services/reward.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignEntity.name, schema: CampaignSchema },
      { name: RewardEntity.name, schema: RewardSchema },
      { name: ParticipationEntity.name, schema: ParticipationSchema },
      { name: RewardLogEntity.name, schema: RewardsLogSchema },
    ]),
  ],
  controllers: [CampaignController, RewardController, ParticipationController],
  providers: [
    CampaignService,
    CampaignRepository,
    RewardService,
    RewardRepository,
    ParticipationService,
    ParticipationRepository,
    RewardLogRepository,
    AuthApiService,
  ],
  exports: [CampaignService],
})
export class CampaignModule {}
