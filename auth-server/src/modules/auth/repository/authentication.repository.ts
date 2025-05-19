import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { AuthenticationEntity } from '../entities/authentication.entity';

@Injectable()
export class AuthenticationRepository extends BaseRepository<AuthenticationEntity> {
  constructor(
    @InjectModel(AuthenticationEntity.name)
    private authenticationModel: Model<AuthenticationEntity>,
  ) {
    super(authenticationModel);
  }
}
