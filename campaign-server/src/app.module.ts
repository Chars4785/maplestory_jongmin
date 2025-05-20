import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CampaignModule } from './modules/campaign/campaign.module';
@Module({
  imports: [
    CampaignModule,
    MongooseModule.forRoot('mongodb://localhost/maplestory'),
    JwtModule.register({
      global: true,
      secret: 'maplestory',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
