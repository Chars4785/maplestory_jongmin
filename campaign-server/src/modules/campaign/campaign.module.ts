import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './controllers/campaign.controller';
import { ParticipationController } from './controllers/participation.controller';
import { RewardController } from './controllers/reward.controller';
import { CampaignEntity } from './entities/campaign.entity';
import { ParticipationEntity } from './entities/participation.entity';
import { RewardEntity } from './entities/rewards.entity';
import { CampaignRepository } from './repository/campaign.repository';
import { RewardRepository } from './repository/reward.repository';
import { CampaignService } from './services/campaign.service';
import { ParticipationService } from './services/participation.service';
import { RewardService } from './services/reward.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignEntity.name, schema: CampaignEntity },
      { name: RewardEntity.name, schema: RewardEntity },
      { name: ParticipationEntity.name, schema: ParticipationEntity },
    ]),
  ],
  controllers: [CampaignController, RewardController, ParticipationController],
  providers: [
    CampaignService,
    CampaignRepository,
    RewardService,
    RewardRepository,
    ParticipationService,
  ],
  exports: [CampaignService],
})
export class CampaignModule {}
