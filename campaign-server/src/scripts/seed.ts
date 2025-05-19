import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParticipationEntity } from 'src/modules/campaign/entities/participation.entity';
import { AppModule } from '../app.module';
import {
  CampaignEntity,
  CampaignStatus,
} from '../modules/campaign/entities/campaign.entity';
import {
  RewardEntity,
  RewardType,
} from '../modules/campaign/entities/rewards.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const campaignModel = app.get<Model<CampaignEntity>>(
    getModelToken(CampaignEntity.name),
  );
  const rewardModel = app.get<Model<RewardEntity>>(
    getModelToken(RewardEntity.name),
  );

  const participationModel = app.get<Model<ParticipationEntity>>(
    getModelToken(ParticipationEntity.name),
  );

  // 기존 데이터 모두 삭제
  await rewardModel.deleteMany({});
  await campaignModel.deleteMany({});
  await participationModel.deleteMany({});

  // 1. Reward 데이터 생성
  const reward = await rewardModel.create({
    id: 'reward1',
    rewardType: RewardType.POINT,
    amount: 100,
    description: '100포인트 지급',
    deletedAt: null,
  });

  // 2. Campaign 데이터 생성
  const campaign = await campaignModel.create({
    id: 'campaign1',
    autoReward: true,
    rewardId: reward.id,
    condition: {
      accountId: 'user1',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-30'),
    },
    creatorId: 'admin',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    status: CampaignStatus.ACTIVE,
    rewards: reward,
    participators: [],
  });

  await participationModel.create({
    campaignId: campaign.id,
    accountId: 'user1',
    rewardDate: new Date('2024-06-01'),
  });

  console.log('Seed data inserted!');
  await app.close();
}

bootstrap();
