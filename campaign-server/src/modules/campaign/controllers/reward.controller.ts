import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RewardService } from '../services/reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  @ApiOperation({ summary: '리워드 조회' })
  getRewards() {
    return 'getRewards';
  }

  @Post()
  @ApiOperation({ summary: '리워드 생성' })
  createReward() {
    return 'createReward';
  }

  @Patch()
  @ApiOperation({ summary: '리워드 수정' })
  updateReward() {
    return 'updateReward';
  }

  @Post()
  @ApiOperation({ summary: '리워드 지급' })
  reward() {
    return 'reward';
  }

  @Get(':id')
  @ApiOperation({ summary: '리워드 지급 내역 조회' })
  getReward(@Param('id') id: string) {
    return 'getReward';
  }
}
