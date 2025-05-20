import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { AccountEntity, AccountSchema } from './entities/account.entity';
import {
  AuthenticationEntity,
  AuthenticationSchema,
} from './entities/authentication.entity';
import { AuthRepository } from './repository/auth.repository';
import { AuthenticationRepository } from './repository/authentication.repository';
import { AuthService } from './services/auth.service';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountEntity.name, schema: AccountSchema },
      { name: AuthenticationEntity.name, schema: AuthenticationSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtService,
    AuthenticationService,
    AuthenticationRepository,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
