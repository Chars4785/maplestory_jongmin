import { StrictBuilder } from 'builder-pattern';
import { AuthenticationEntity } from 'src/modules/auth/entities/authentication.entity';

export class AuthenticationDto {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountId: string;

  static fromEntity(entity: AuthenticationEntity): AuthenticationDto {
    return StrictBuilder<AuthenticationDto>()
      .id(entity._id?.toString() ?? '')
      .accessToken(entity.accessToken)
      .refreshToken(entity.refreshToken)
      .expiresAt(entity.expiresAt)
      .accountId(entity.accountId)
      .build();
  }
}
