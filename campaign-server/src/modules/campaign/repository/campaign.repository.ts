import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { CampaignEntity } from '../entities/campaign.entity';

@Injectable()
export class CampaignRepository extends BaseRepository<CampaignEntity> {
  constructor(
    @InjectModel(CampaignEntity.name)
    private campaignModel: Model<CampaignEntity>,
  ) {
    super(campaignModel);
  }
}
