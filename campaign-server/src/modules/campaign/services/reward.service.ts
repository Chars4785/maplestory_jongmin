import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/base-exception';
import { CreateRewardDto } from '../dto/reward/create-reward.dto';
import { RewardDto } from '../dto/reward/reward.dto';
import { UpdateRewardDto } from '../dto/reward/update-reward.dto';
import { RewardRepository } from '../repository/reward.repository';

@Injectable()
export class RewardService {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async findRewardById(id: string) {
    const reward = await this.rewardRepository.findById(id);
    return reward ? RewardDto.fromEntity(reward) : null;
  }

  async getRewards() {
    const rewards = await this.rewardRepository.findAll();
    return rewards.map((reward) => RewardDto.fromEntity(reward));
  }

  async createReward(params: CreateRewardDto) {
    const reward = await this.rewardRepository.create(params);
    return RewardDto.fromEntity(reward);
  }

  async updateReward(id: string, params: UpdateRewardDto) {
    const reward = await this.rewardRepository.findById(id);
    if (!reward) {
      throw new NotFoundException({
        message: '존재하지 않은 리워드입니다.',
      });
    }

    const updatedReward = await this.rewardRepository.update(id, params);
    return updatedReward ? RewardDto.fromEntity(updatedReward) : null;
  }

  async deleteReward(id: string) {
    const reward = await this.rewardRepository.findById(id);
    if (!reward) {
      throw new NotFoundException({
        message: '존재하지 않은 리워드입니다.',
      });
    }

    await this.rewardRepository.delete(id);
    return id;
  }
}
