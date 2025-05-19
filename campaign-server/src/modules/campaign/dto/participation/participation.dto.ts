import { StrictBuilder } from 'builder-pattern';
import {
  ParticipationEntity,
  ParticipationStatus,
} from '../../entities/participation.entity';

export class ParticipationDto {
  id: string;
  campaignId: string;
  accountId: string;
  rewardDate: Date | null;
  status: ParticipationStatus;
  deletedAt: Date | null;

  static fromEntity(entity: ParticipationEntity): ParticipationDto {
    return StrictBuilder<ParticipationDto>()
      .id(entity.id)
      .campaignId(entity.campaignId)
      .accountId(entity.accountId)
      .rewardDate(entity.rewardDate)
      .status(entity.status)
      .deletedAt(entity.deletedAt)
      .build();
  }
}
