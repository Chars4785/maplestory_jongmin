import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validateType } from 'src/utils/validation.utils';
import { CampaignDto } from '../dto/campaign/campaign.dto';
import { CreateCampaignDto } from '../dto/campaign/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/campaign/update-campaign.dto';
import { CampaignStatus } from '../entities/campaign.entity';
import { CampaignRepository } from '../repository/campaign.repository';
import { RewardCondition } from '../types/reward-condition.type';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async findCampaignById(campaignId: string) {
    // TODO: 캠페인에 속한 리워드 및 참여자도 같이 조회 하는 것 추가
    const campaign = await this.campaignRepository.findById(campaignId);
    return campaign ? CampaignDto.fromEntity(campaign) : null;
  }

  async findCampaignList() {
    const campaigns = await this.campaignRepository.findAll();
    return campaigns.map((entity) => CampaignDto.fromEntity(entity));
  }

  async getActiveCampaign(campaignId: string) {
    const campaign = await this.campaignRepository.findOne({
      _id: campaignId,
      status: CampaignStatus.ACTIVE,
      endDate: { $gt: new Date() },
    });

    if (!campaign) {
      throw new NotFoundException('캠패인을 찾을 수 없습니다.');
    }

    if (campaign.status !== CampaignStatus.ACTIVE) {
      throw new BadRequestException('캠패인이 활성화 되지 않았습니다.');
    }

    if (campaign.endDate < new Date()) {
      throw new BadRequestException('캠패인이 종료되었습니다.');
    }

    return CampaignDto.fromEntity(campaign);
  }

  async createCampaign(creatorId: string, params: CreateCampaignDto) {
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

    // TODO: reward 와 연결 해야 한다.
    // 해당 캠페인이 어떤 reward 와 연결 될지

    return this.campaignRepository.create({
      ...params,
      creatorId,
    });
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
