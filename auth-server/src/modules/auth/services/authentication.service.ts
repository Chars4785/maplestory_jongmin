import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationDto } from '../dto/authentication.dto';
import { AuthenticationRepository } from '../repository/authentication.repository';

@Injectable()
export class AuthenticationService {
  accessTokenExp: number;
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenExp = this.configService.getOrThrow('auth.accessTokenExp');
  }

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
}
