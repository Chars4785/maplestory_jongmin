import { Module } from '@nestjs/common';
import { AuthApiService } from './service/auth-api.service';

@Module({
  providers: [AuthApiService],
  exports: [AuthApiService],
})
export class ApiModule {}
