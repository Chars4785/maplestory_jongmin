import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { NotFoundException } from 'src/common/base-exception';
import { AuthApiService } from 'src/modules/api/service/auth-api.service';
import { ParticipationDto } from '../dto/participation/participation.dto';
import { RewardLogDto } from '../dto/rewardlog/reward-log.dto';
import { ParticipationStatus } from '../entities/participation.entity';
import { ParticipationAlreadyRewardedException } from '../exception/participation-already-rewarded.exception';
import { ParticipationRepository } from '../repository/participation.repository';
import { RewardLogRepository } from '../repository/rewards-log.repository';
import {
  ClearQuestCondition,
  InvitedFriendCountCondition,
  RecentThreeDayLoginCondition,
  RewardCondition,
} from '../types/reward-condition.type';
import { CampaignService } from './campaign.service';

@Injectable()
export class ParticipationService {
  constructor(
    private readonly participationRepository: ParticipationRepository,
    private readonly campaignService: CampaignService,
    private readonly rewardLogRepository: RewardLogRepository,
    @InjectConnection() private readonly connection: Connection,
    private readonly authApiService: AuthApiService,
  ) {}

  async findParticipationById(id: string): Promise<ParticipationDto | null> {
    const participation = await this.participationRepository.findById(id);
    return participation ? ParticipationDto.fromEntity(participation) : null;
  }

  async getParticipationById(participationId: string) {
    const participation =
      await this.participationRepository.findById(participationId);
    if (!participation) {
      throw new NotFoundException({
        message: '참여 정보를 찾을 수 없습니다.',
      });
    }
    return ParticipationDto.fromEntity(participation);
  }

  async getParticipationList() {
    const participators = await this.participationRepository.findAll();
    return participators.map((participation) =>
      ParticipationDto.fromEntity(participation),
    );
  }

  async createParticipation(accountId: string, campaignId: string) {
    const campaign = await this.campaignService.getActiveCampaign(campaignId);

    const participation = await this.participationRepository.create({
      campaignId: campaign.id,
      accountId,
      status: ParticipationStatus.PENDING,
    });
    return ParticipationDto.fromEntity(participation);
  }

  async getParticipatorsRewardHistory() {
    const rewardHistory = await this.rewardLogRepository.findAll();
    return rewardHistory.map((reward) => RewardLogDto.fromEntity(reward));
  }

  async getParticipationRewardHistory(participationId: string) {
    const rewardHistory = await this.rewardLogRepository.findOne({
      participationId,
    });

    if (!rewardHistory) {
      throw new NotFoundException({
        message: '보상 지급 내역을 찾을 수 없습니다.',
      });
    }

    return RewardLogDto.fromEntity(rewardHistory);
  }

  async participationReward(id: string, executedAccountId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const participation = await this.participationRepository.findById(id);
      if (!participation) {
        throw new NotFoundException({
          message: '참여 정보를 찾을 수 없습니다.',
        });
      }

      if (participation.status !== ParticipationStatus.PENDING) {
        throw new ParticipationAlreadyRewardedException();
      }

      const campaign = await this.campaignService.getActiveCampaign(
        participation.campaignId,
      );

      const account = await this.authApiService.getAccount(
        participation.accountId,
      );

      await this.validateParticipationConditionForReward(
        campaign.condition,
        account,
      );

      await this.rewardLogRepository.create({
        campaignId: campaign.id,
        rewardedAccountId: participation.accountId,
        rewardId: campaign.rewardId,
        executedAccountId,
      });

      await this.participationRepository.update(id, {
        status: ParticipationStatus.REWARDED,
        rewardDate: new Date(),
      });

      await session.commitTransaction();
      return participation;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }

  async validateParticipationConditionForReward(condition: RewardCondition) {
    if (condition instanceof RecentThreeDayLoginCondition) {
      // 최근 3일 로그인 조건 검증
    } else if (condition instanceof InvitedFriendCountCondition) {
      // 초대 친구 수 조건 검증
    } else if (condition instanceof ClearQuestCondition) {
      // 퀘스트 완료 조건 검증
    }
  }
}
