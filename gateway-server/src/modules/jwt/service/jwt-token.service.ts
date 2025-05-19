import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'common/types/jwt-payload.type';
@Injectable()
export class JwtTokenService {
  jwtSecret: string;
  accessTokenExp: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow('auth.jwtSecret');
    this.accessTokenExp = this.configService.getOrThrow('auth.accessTokenExp');
  }

  /**
   * 계정 정보를 기반으로 JWT 액세스 토큰을 생성합니다.
   */
  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const access_token = await this.jwtService.signAsync(
      { ...payload },
      {
        secret: this.jwtSecret,
        expiresIn: this.accessTokenExp,
      },
    );
    return access_token;
  }

  /**
   * JWT 토큰의 유효성을 검증하고 페이로드를 반환합니다.
   * @throws UnauthorizedException 토큰이 유효하지 않은 경우
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * JWT 토큰에서 페이로드를 추출합니다. (검증 없이)
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      return this.jwtService.decode(token);
    } catch {
      return null;
    }
  }
}
