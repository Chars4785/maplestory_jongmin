import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RewardCondition } from '../types/reward-condition.type';
import { RewardType } from '../types/reward-type.enum';

export type CampaignDocument = HydratedDocument<CampaignEntity>;

export enum Role {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class CampaignEntity {
  // 자동 지급
  @Prop({ required: true })
  autoReward: boolean;
  // reward 종류
  @Prop({ required: true, enum: RewardType })
  rewardType: RewardType;

  // 조건 metadata
  @Prop({ required: true })
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
  status: string;
}

export const AccountSchema = SchemaFactory.createForClass(CampaignEntity);
