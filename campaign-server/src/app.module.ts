import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignModule } from './modules/campaign/campaign.module';

@Module({
  imports: [
    CampaignModule,
    MongooseModule.forRoot('mongodb://localhost/maplestory'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
