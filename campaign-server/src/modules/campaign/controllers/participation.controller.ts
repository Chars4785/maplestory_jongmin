import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ParticipationService } from '../services/participation.service';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) {}

  @Get()
  @ApiOperation({ summary: '참여 조회' })
  getParticipations() {
    return 'getParticipations';
  }

  @Get(':id')
  @ApiOperation({ summary: '단건 참여 조회' })
  getParticipation(@Param('id') id: string) {
    return 'getParticipation';
  }

  @Post()
  @ApiOperation({ summary: '유저 요청' })
  createParticipation() {
    return 'createParticipation';
  }
}
