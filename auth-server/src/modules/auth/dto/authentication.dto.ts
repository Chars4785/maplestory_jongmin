import { StrictBuilder } from 'builder-pattern';
import { AuthenticationEntity } from 'src/modules/auth/entities/authentication.entity';

export class AuthenticationDto {
  accessorToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountId: string;

  static fromEntity(entity: AuthenticationEntity): Partial<AuthenticationDto> {
    return StrictBuilder<AuthenticationDto>()
      .accessorToken(entity.accessToken)
      .refreshToken(entity.refreshToken)
      .expiresAt(entity.expiresAt)
      .accountId(entity.accountId)
      .build();
  }
}
