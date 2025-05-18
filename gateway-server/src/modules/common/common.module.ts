import { Module } from '@nestjs/common';
import { BaseApiService } from './services/base-api.service';

@Module({
  imports: [],
  providers: [],
  exports: [BaseApiService],
})
export class CommonModule {}
