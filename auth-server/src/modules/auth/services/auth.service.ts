import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/base-exception';
import {
  createHashedPassword,
  isIncorrectPassword,
} from 'src/utils/password.utils';
import { AccountDto } from '../dto/account.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountAlreadyExistsException } from '../exception/account-already-exists.exception';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async createAccount(createAccount: CreateAccountDto) {
    const existingAccount = await this.authRepository.findOne({
      where: {
        loginId: createAccount.loginId,
      },
    });

    if (existingAccount) {
      throw new AccountAlreadyExistsException();
    }

    const account = await this.authRepository.create({
      ...createAccount,
      password: createHashedPassword(createAccount.password),
    });
    return AccountDto.fromEntity(account);
  }

  async getAccountByLoginIdAndPassword(accountDto: AccountDto) {
    const account = await this.authRepository.findOne({
      where: {
        loginId: accountDto.loginId,
      },
    });

    if (!account) {
      throw new NotFoundException({
        message: '계정을 찾을수 없습니다.',
      });
    }

    if (isIncorrectPassword(accountDto.password, account.password)) {
      throw new NotFoundException({
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    return AccountDto.fromEntity(account);
  }
}
