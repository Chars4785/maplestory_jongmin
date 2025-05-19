import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CampaignEntity } from './campaign.entity';

export type ParticipationDocument = HydratedDocument<ParticipationEntity>;

export enum ParticipationStatus {
  PENDING = 'PENDING',
  REWARDED = 'REWARDED',
  FAIL = 'FAIL',
}

@Schema({ timestamps: true })
export class ParticipationEntity {
  @Prop({ alias: '_id' })
  id: string;

  @Prop({ required: true })
  campaignId: string;

  @Prop({ required: true })
  accountId: string;

  @Prop({ type: Date, nullable: true })
  rewardDate: Date | null;

  @Prop({
    required: true,
    enum: ParticipationStatus,
    default: ParticipationStatus.PENDING,
  })
  status: ParticipationStatus = ParticipationStatus.PENDING;

  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Prop({ type: Types.ObjectId, ref: 'Campaign' })
  campaign: CampaignEntity;
}

export const ParticipationSchema =
  SchemaFactory.createForClass(ParticipationEntity);
