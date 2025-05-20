import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RewardDocument = HydratedDocument<RewardEntity>;

export enum RewardType {
  POINT = 'POINT',
  COUPON = 'COUPON',
  PRODUCT = 'PRODUCT',
}

@Schema({ timestamps: true })
export class RewardEntity {
  _id?: Types.ObjectId;
  @Prop({ required: true })
  rewardType: RewardType;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, nullable: true })
  deletedAt: Date | null;
}

export const RewardSchema = SchemaFactory.createForClass(RewardEntity);
