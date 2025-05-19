import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthUserDto } from 'common/types/auth-user.type';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { CreateParticipationDto } from '../dto/participation/create-participation.dto';
import { ParticipationService } from '../services/participation.service';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Get()
  @ApiOperation({ summary: '유저 캠패인 참여 조회' })
  getParticipations() {
    return this.participationService.getParticipationList();
  }

  @Get(':id')
  @ApiOperation({ summary: '단건 참여 조회' })
  getParticipation(@Param('id') id: string) {
    return this.participationService.getParticipationById(id);
  }

  @Post()
  @ApiOperation({ summary: '유저 요청' })
  async createParticipation(
    @Body() body: CreateParticipationDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const participation = await this.participationService.createParticipation(
      user.accountId,
      body.campaignId,
    );
    return this.participationService.findParticipationById(participation.id);
  }

  // 보상 지급
  @Post(':id/reward')
  @ApiOperation({ summary: '보상 지급' })
  async participationReward(
    @Param('id') id: string,
    @AuthUser() user: AuthUserDto,
  ) {
    return this.participationService.participationReward(id, user.accountId);
  }

  @Get('reward-history')
  @ApiOperation({ summary: '보상 지급 내역' })
  async getParticipatorsRewardHistory() {
    return this.participationService.getParticipatorsRewardHistory();
  }

  // 보상 지급 내역
  @Get(':participationId/reward-history')
  @ApiOperation({ summary: '보상 지급 내역' })
  async getParticipationRewardHistory(
    @Param('participationId') participationId: string,
  ) {
    return this.participationService.getParticipationRewardHistory(
      participationId,
    );
  }
}
