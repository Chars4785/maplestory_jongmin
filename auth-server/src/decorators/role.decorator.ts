import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/auth/entities/account.entity';

export const Roles = Reflector.createDecorator<Role[]>();
