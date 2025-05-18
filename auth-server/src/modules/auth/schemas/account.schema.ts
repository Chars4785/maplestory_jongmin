import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true, unique: true })
  loginId: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  deletedAt?: Date;

  // 마지막 로그인 시간
  @Prop()
  lastLoginAt?: Date;

  // 달성한 업적 목록
  @Prop()
  achievements: string[];

  // 초대 친구 카운트
  @Prop()
  invitedFriendCount: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
