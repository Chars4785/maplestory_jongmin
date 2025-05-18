import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParticipationDocument = HydratedDocument<ParticipationEntity>;

@Schema({ timestamps: true })
export class ParticipationEntity {
  @Prop({ required: true })
  campaignId: string;

  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  rewardDate: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  deletedAt: Date;
}

export const ParticipationSchema =
  SchemaFactory.createForClass(ParticipationEntity);
