import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule {}
