import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/common/base-exception';

export class ParticipationAlreadyRewardedException extends BaseException {
  constructor() {
    super({
      message: '이미 보상을 지급 받았습니다.',
      httpStatus: HttpStatus.CONFLICT,
    });
  }
}
