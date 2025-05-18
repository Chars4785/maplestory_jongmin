import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/common/base-exception';

export class AccountAlreadyExistsException extends BaseException {
  constructor() {
    super({
      message: '이미 계정이 존재합니다.',
      httpStatus: HttpStatus.CONFLICT,
    });
  }
}
