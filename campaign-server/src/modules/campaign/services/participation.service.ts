import { Injectable } from '@nestjs/common';
import { ParticipationRepository } from '../repository/participation.repository';

@Injectable()
export class ParticipationService {
  constructor(
    private readonly participationRepository: ParticipationRepository,
  ) {}
}
