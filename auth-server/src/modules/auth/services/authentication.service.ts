import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common/base-exception';
import { AuthenticationDto } from '../dto/authentication.dto';
import { AuthenticationRepository } from '../repository/authentication.repository';

@Injectable()
export class AuthenticationService {
  private readonly accessTokenExp = 36000;
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  //   validateAuthentication(secretKey: AuthSecretKey) {
  //     if (secretKey === AuthSecretKey.CUSTOMER) {
  //       return RoleType.CUSTOMER;
  //     }

  //     if (secretKey === AuthSecretKey.PARTNER) {
  //       return RoleType.PARTNER;
  //     }

  //     throw new UnauthorizedException();
  //   }

  async findOneByAccountId(accountId: string) {
    const authentication = await this.authenticationRepository.findOne({
      accountId,
    });

    return authentication ? AuthenticationDto.fromEntity(authentication) : null;
  }

  async createAuthentication(id: string, token: string) {
    const authentication = await this.authenticationRepository.create({
      accountId: id,
      accessToken: token,
      refreshToken: token,
      expiresAt: new Date(Date.now() + this.accessTokenExp),
    });

    return AuthenticationDto.fromEntity(authentication);
  }

  async updateTokenAuthentication(accountId: string, token: string) {
    const authentication = await this.authenticationRepository.findOne({
      accountId,
    });

    if (!authentication) {
      throw new NotFoundException({
        message: '인증 정보를 찾을수 없습니다.',
      });
    }

    await this.authenticationRepository.update(
      authentication._id?.toString() ?? '',
      {
        accessToken: token,
        refreshToken: token,
        expiresAt: new Date(Date.now() + this.accessTokenExp),
      },
    );
  }
}
