import { Module } from '@nestjs/common';
import { ApiService } from './services/api.service';

@Module({
  imports: [],
  providers: [ApiService],
  exports: [ApiService],
})
export class CommonModule {}
