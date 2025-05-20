import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountEntity } from 'src/modules/auth/entities/account.entity';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const accountModel = app.get<Model<AccountEntity>>(
    getModelToken(AccountEntity.name),
  );
  // 기존 데이터 삭제
  await accountModel.deleteMany({});

  // 초기 계정 생성
  const user = await accountModel.create({
    loginId: 'user',
    password: '$2b$10$2SQ3.9J1ULzJaHBaRMHMwu4HQKzAoICftJH7qw3UxgPxP5o5/bl4G', // password123
    role: 'USER',
    achievements: [],
    invitedFriendCount: 1,
  });

  await accountModel.create([
    {
      loginId: 'admin',
      password: '$2b$10$2SQ3.9J1ULzJaHBaRMHMwu4HQKzAoICftJH7qw3UxgPxP5o5/bl4G', // password123
      role: 'ADMIN',
      achievements: [],
      invitedFriendCount: 0,
    },
    {
      loginId: 'user2',
      password: '$2b$10$2SQ3.9J1ULzJaHBaRMHMwu4HQKzAoICftJH7qw3UxgPxP5o5/bl4G', // password123
      role: 'USER',
      achievements: [user._id],
      invitedFriendCount: 1,
    },
  ]);

  console.log('Seed data inserted!');
  await app.close();
}

bootstrap();
