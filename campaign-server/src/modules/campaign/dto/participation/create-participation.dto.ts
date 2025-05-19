import { IsString } from 'class-validator';

export class CreateParticipationDto {
  @IsString()
  campaignId: string;
}
