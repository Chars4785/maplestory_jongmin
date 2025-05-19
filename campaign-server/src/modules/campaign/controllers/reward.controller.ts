import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateRewardDto } from '../dto/reward/create-reward.dto';
import { UpdateRewardDto } from '../dto/reward/update-reward.dto';
import { RewardService } from '../services/reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  @ApiOperation({ summary: '리워드 조회' })
  getRewards() {
    return this.rewardService.getRewards();
  }

  @Post()
  @ApiOperation({ summary: '리워드 생성' })
  createReward(@Body() body: CreateRewardDto) {
    return this.rewardService.createReward(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: '리워드 수정' })
  updateReward(@Param('id') id: string, @Body() body: UpdateRewardDto) {
    return this.rewardService.updateReward(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: '리워드 삭제' })
  deleteReward(@Param('id') id: string) {
    return this.rewardService.deleteReward(id);
  }
}
