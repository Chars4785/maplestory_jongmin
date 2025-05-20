import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

const JWT_SECRET = 'maplestory';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token || !request.headers.authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        message: '토큰이 없거나 Bearer 토큰이 아닙니다.',
      });
    }
    try {
      await this.jwtTokenService.verifyAsync(token, {
        secret: JWT_SECRET,
      });
      return true;
    } catch (error: unknown) {
      console.error(error);
      throw new UnauthorizedException({ message: '유효하지 않은 토큰입니다.' });
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
