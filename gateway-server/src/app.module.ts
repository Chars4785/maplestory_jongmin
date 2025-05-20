import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from './modules/common/common.module';
import { RouterModule } from './modules/router/router.module';

@Module({
  imports: [
    CommonModule,
    RouterModule,
    JwtModule.register({
      global: true,
      secret: 'maplestory',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
