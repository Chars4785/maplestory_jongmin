import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuthenticationDocument = AuthenticationEntity & Document;

@Schema({ timestamps: true })
export class AuthenticationEntity {
  _id?: Types.ObjectId;
  @Prop({ unique: true })
  accessToken: string;

  @Prop({ unique: true })
  refreshToken: string;

  @Prop()
  expiresAt: Date;

  @Prop()
  accountId: string;
}

export const AuthenticationSchema =
  SchemaFactory.createForClass(AuthenticationEntity);
