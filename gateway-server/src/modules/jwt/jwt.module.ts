import { Global, Module } from '@nestjs/common';
import { JwtModule as JwtModuleOrg } from '@nestjs/jwt';
import { JwtTokenService } from './service/jwt-token.service';

@Global()
@Module({
  imports: [
    JwtModuleOrg.register({
      global: true,
      secret: process.env.JWT_SECRET || 'nubilabtest',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtModule {}
