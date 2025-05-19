import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<AccountEntity>;

export enum Role {
  USER = 'USER',
  OPERATOR = 'OPERATOR',
  AUDITOR = 'AUDITOR',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class AccountEntity {
  @Prop({ alias: '_id' })
  id: string;

  @Prop({ required: true, unique: true })
  loginId: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

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

export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
