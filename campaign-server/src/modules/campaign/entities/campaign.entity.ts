import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RewardCondition } from '../types/reward-condition.type';
import { ParticipationEntity } from './participation.entity';
import { RewardEntity } from './rewards.entity';

export type CampaignDocument = HydratedDocument<CampaignEntity>;

export enum Role {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

export enum CampaignStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Schema({ timestamps: true })
export class CampaignEntity {
  @Prop({ alias: '_id' })
  id: string;

  // 자동 지급
  @Prop({ required: true })
  autoReward: boolean;

  // reward 종류
  @Prop({ type: Types.ObjectId, ref: 'Reward' })
  rewardId: string;

  // 조건 metadata
  @Prop({ type: Object, required: true })
  condition: RewardCondition;

  // 캠패인 생성자
  @Prop({ required: true })
  creatorId: string;

  // 캠패인 기간
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  // 캠패인 상태
  @Prop({ required: true })
  status: CampaignStatus;

  @Prop({ type: RewardEntity })
  rewards: RewardEntity;

  @Prop({ type: [Types.ObjectId], ref: 'Participation', default: [] })
  participators: ParticipationEntity[];
}

export const CampaignSchema = SchemaFactory.createForClass(CampaignEntity);
