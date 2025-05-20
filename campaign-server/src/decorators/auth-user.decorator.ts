import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'common/types/jwt-payload.type';
import { Request } from 'express';

const JWT_SECRET = 'maplestory';

export const AuthUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return null;
    }

    const jwtService = new JwtService({
      secret: JWT_SECRET,
    });

    try {
      const decoded = await jwtService.verifyAsync<JwtPayload>(token);
      return decoded;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);
