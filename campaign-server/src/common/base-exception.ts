import { HttpStatus } from '@nestjs/common';
import { NullishArg } from './type-aliases';

export class CommonResultCode {
  static readonly SUCCESS = 'SUCCESS';
  static readonly UNKNOWN_ERROR = 'UNKNOWN_ERROR';
  static readonly BAD_PARAMETERS = 'BAD_PARAMETERS';
  static readonly PERMISSION_DENIED = 'PERMISSION_DENIED';
  static readonly UNAUTHORIZED = 'UNAUTHORIZED';
}

export enum CommonResultCodeEnum {
  SUCCESS = 'SUCCESS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  BAD_PARAMETERS = 'BAD_PARAMETERS',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface BaseExceptionParams {
  message: string;
  httpStatus?: HttpStatus;
  cause?: unknown;
  shouldReport?: boolean;
  debugPayload?: NullishArg<unknown>;
}

export class BaseException extends Error {
  httpStatus: HttpStatus;
  shouldReport: boolean;
  debugPayload: NullishArg<unknown>;
  constructor({
    message,
    httpStatus,
    cause,
    shouldReport,
    debugPayload,
  }: BaseExceptionParams) {
    super(message, { cause });
    this.httpStatus = httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this.shouldReport = shouldReport ?? true;
    this.debugPayload = debugPayload ?? null;
  }
}

export class BadParametersException extends BaseException {
  constructor(
    params: Omit<BaseExceptionParams, 'httpStatus' | 'additionalData'>,
  ) {
    super({
      httpStatus: HttpStatus.BAD_REQUEST,
      ...params,
    });
  }
}

export class NotFoundException extends BaseException {
  constructor(params: Omit<BaseExceptionParams, 'httpStatus'>) {
    super({
      httpStatus: HttpStatus.NOT_FOUND,
      ...params,
    });
  }
}

export class UnauthorizedException extends BaseException {
  constructor(params?: Omit<BaseExceptionParams, 'httpStatus' | 'message'>) {
    super({
      ...params,
      httpStatus: HttpStatus.UNAUTHORIZED,
      message: '인증 정보를 찾을 수 없습니다.',
    });
  }
}

export class AlreadyExistsException extends BaseException {
  constructor(params: Omit<BaseExceptionParams, 'httpStatus'>) {
    super({
      httpStatus: HttpStatus.CONFLICT,
      ...params,
    });
  }
}
