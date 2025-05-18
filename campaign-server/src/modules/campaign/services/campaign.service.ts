import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validateType } from 'src/utils/validation.utils';
import { CampaignDto } from '../dto/campaign.dto';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CampaignRepository } from '../repository/campaign.repository';
import { RewardCondition } from '../types/reward-condition.type';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async findCampaignById(campaignId: string) {
    const campaign = await this.campaignRepository.findById(campaignId);
    return campaign ? CampaignDto.fromEntity(campaign) : null;
  }

  async findCampaignList() {
    const campaigns = await this.campaignRepository.findAll();
    return campaigns.map(CampaignDto.fromEntity(campaign));
  }

  async createCampaign(params: CreateCampaignDto) {
    // 날짜의 끝이 시작보다 이전이면 안된다.
    if (params.startDate > params.endDate) {
      throw new BadRequestException('날짜의 끝이 시작보다 이전이면 안된다.');
    }
    // 날짜의 끝이 현재 보다 이전이면 안된다.
    if (params.endDate < new Date()) {
      throw new BadRequestException('날짜의 끝이 현재 보다 이전이면 안된다.');
    }
    // 조건의 타입을 체크 하는 로직이 필요 하다.
    if (validateType(params.condition, {} as RewardCondition)) {
      throw new BadRequestException('조건의 타입이 올바르지 않습니다.');
    }
    return this.campaignRepository.create(params);
  }

  async updateCampaign(id: string, params: UpdateCampaignDto) {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      throw new NotFoundException('캠페인을 찾을 수 없습니다.');
    }
    return this.campaignRepository.update(id, params);
  }

  async deleteCampaign(campaignId: string) {
    return this.campaignRepository.delete(campaignId);
  }
}
