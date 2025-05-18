import { Module } from '@nestjs/common';
import { RouterController } from './controllers/router.controller';
import { RouterService } from './service/router.service';

@Module({
  controllers: [RouterController],
  providers: [RouterService],
})
export class RouterModule {}
