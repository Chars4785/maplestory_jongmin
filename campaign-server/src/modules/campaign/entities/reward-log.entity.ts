import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RewardsLogDocument = HydratedDocument<RewardLogEntity>;

@Schema({ timestamps: true })
export class RewardLogEntity {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  campaignId: string;

  @Prop({ required: true })
  rewardedAccountId: string;

  @Prop({ required: true })
  rewardId: string;

  @Prop({ required: true })
  executedAccountId: string;
}

export const RewardsLogSchema = SchemaFactory.createForClass(RewardLogEntity);
