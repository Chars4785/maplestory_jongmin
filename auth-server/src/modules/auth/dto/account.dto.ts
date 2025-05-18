import { StrictBuilder } from 'builder-pattern';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AccountEntity } from '../entities/account.entity';

export class AccountDto {
  @IsEmail()
  @IsNotEmpty()
  loginId: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  static fromEntity(entity: AccountEntity): AccountDto {
    return StrictBuilder<AccountDto>()
      .loginId(entity.loginId)
      .password(entity.password)
      .build();
  }
}
