import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthUserDto } from 'common/types/auth-user.type';

import { AuthUser } from '../../../decorators/auth-user.decorator';
import { CreateCampaignDto } from '../dto/campaign/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/campaign/update-campaign.dto';
import { CampaignService } from '../services/campaign.service';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get(':id')
  @ApiOperation({ summary: '캠페인 조회' })
  async getCampaign(@Param('id') id: string) {
    const campaign = await this.campaignService.findCampaignById(id);
    if (!campaign) {
      throw new NotFoundException('캠페인을 찾을 수 없습니다.');
    }
    return campaign;
  }

  @Get()
  @ApiOperation({ summary: '캠페인 목록 조회' })
  async getCampaignList() {
    const campaigns = await this.campaignService.findCampaignList();
    return campaigns;
  }

  @Post()
  @ApiOperation({ summary: '캠페인 생성' })
  async createCampaign(
    @Body() body: CreateCampaignDto,
    @AuthUser() user: AuthUserDto,
  ) {
    const campaign = await this.campaignService.createCampaign(
      user.accountId,
      body,
    );
    return campaign;
  }

  @Patch(':id')
  @ApiOperation({ summary: '캠페인 수정' })
  async updateCampaign(
    @Param('id') id: string,
    @Body() body: UpdateCampaignDto,
  ) {
    const campaign = await this.campaignService.updateCampaign(id, body);
    return campaign;
  }

  @Delete(':id')
  @ApiOperation({ summary: '캠페인 삭제' })
  async deleteCampaign(@Param('id') id: string) {
    const campaign = await this.campaignService.deleteCampaign(id);
    return campaign;
  }
}
