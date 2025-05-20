import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'common/types/jwt-payload.type';
import { Request } from 'express';
import { Roles } from 'src/decorators/role.decorator';
export enum Role {
  USER = 'USER', // 유저
  OPERATOR = 'OPERATOR', // 운영자
  AUDITOR = 'AUDITOR', // 감사자
  ADMIN = 'ADMIN', // 관리자
}
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({ message: 'Token not found' });
    }
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    if (!payload.role) {
      throw new UnauthorizedException({ message: 'Role not found' });
    }
    const requiredRoles = this.reflector.getAllAndMerge(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (requiredRoles.length === 0) {
      return true;
    }
    return requiredRoles.some((role) => payload.role === role);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
