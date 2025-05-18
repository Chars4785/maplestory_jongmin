import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthenticationDocument = AuthenticationEntity & Document;

@Schema({ timestamps: true })
export class AuthenticationEntity {
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
