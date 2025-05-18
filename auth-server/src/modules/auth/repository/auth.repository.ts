import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/common/base.repository';
import { AccountEntity } from '../entities/account.entity';

@Injectable()
export class AuthRepository extends BaseRepository<AccountEntity> {
  constructor(
    @InjectModel(AccountEntity.name)
    private accountModel: Model<AccountEntity>,
  ) {
    super(accountModel);
  }
}
