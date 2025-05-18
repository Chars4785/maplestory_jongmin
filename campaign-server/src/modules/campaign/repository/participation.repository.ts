import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { ParticipationEntity } from '../entities/participation.entity';

@Injectable()
export class ParticipationRepository extends BaseRepository<ParticipationEntity> {
  constructor(
    @InjectModel(ParticipationEntity.name)
    private participationModel: Model<ParticipationEntity>,
  ) {
    super(participationModel);
  }
}
