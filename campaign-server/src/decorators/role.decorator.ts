import { Reflector } from '@nestjs/core';
export enum Role {
  USER = 'USER', // 유저
  OPERATOR = 'OPERATOR', // 운영자
  AUDITOR = 'AUDITOR', // 감사자
  ADMIN = 'ADMIN', // 관리자
}

export const Roles = Reflector.createDecorator<Role[]>();
