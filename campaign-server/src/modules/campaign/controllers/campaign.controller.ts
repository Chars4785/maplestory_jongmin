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
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CampaignService } from '../services/campaign.service';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Get(':id')
  @ApiOperation({ summary: '캠페인 조회' })
  async getCampaign(@Param('id') id: string) {
    // 캠페인 조회 권한 체크
    const campaign = await this.campaignService.findCampaignById(id);
    if (!campaign) {
      throw new NotFoundException('캠페인을 찾을 수 없습니다.');
    }
    return campaign;
  }

  @Get()
  @ApiOperation({ summary: '캠페인 목록 조회' })
  async getCampaignList() {
    // 캠페인 목록 조회 권한 체크
    const campaigns = await this.campaignService.findCampaignList();
    return campaigns;
  }

  @Post()
  @ApiOperation({ summary: '캠페인 생성' })
  async createCampaign(@Body() body: CreateCampaignDto) {
    // 생성자의 권한 체크
    const campaign = await this.campaignService.createCampaign(body);
    return campaign;
  }

  @Patch(':id')
  @ApiOperation({ summary: '캠페인 수정' })
  async updateCampaign(
    @Param('id') id: string,
    @Body() body: UpdateCampaignDto,
  ) {
    // 수정자의 권한 체크
    const campaign = await this.campaignService.updateCampaign(id, body);
    return campaign;
  }

  @Delete(':id')
  @ApiOperation({ summary: '캠페인 삭제' })
  async deleteCampaign(@Param('id') id: string) {
    // 삭제자의 권한 체크
    const campaign = await this.campaignService.deleteCampaign(id);
    return campaign;
  }
}
