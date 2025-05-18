import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RewardDocument = HydratedDocument<RewardEntity>;

@Schema({ timestamps: true })
export class RewardEntity {
  @Prop({ required: true })
  rewardType: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  deletedAt: Date;
}

export const RewardSchema = SchemaFactory.createForClass(RewardEntity);