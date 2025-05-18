import { Cron } from '@nestjs/schedule';
import { CampaignService } from '../services/campaign.service';

export class CheckAutoCampaignRewardBatch {
  constructor(private readonly campaignService: CampaignService) {}

  @Cron('* * * * *') // 매 분마다 실행
  async checkUpcomingReservations() {}
}
