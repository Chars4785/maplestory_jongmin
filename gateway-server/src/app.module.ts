import { Module } from '@nestjs/common';
import { CommonModule } from './modules/common/common.module';
import { RouterModule } from './modules/router/router.module';

@Module({
  imports: [CommonModule, RouterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
