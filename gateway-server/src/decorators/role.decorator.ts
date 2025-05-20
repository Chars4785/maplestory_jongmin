import { Reflector } from '@nestjs/core';
import { Role } from 'common/types/role.type';

export const Roles = Reflector.createDecorator<Role[]>();
