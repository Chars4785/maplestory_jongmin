import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from './base-exception';

interface ExceptionResponse {
  message?: string;
  errors?: unknown;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorData: unknown = null;

    console.error(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object') {
        const r = response as ExceptionResponse;
        message = r.message || message;
        errorData = r.errors || null;
      }
    } else if (exception instanceof BaseException) {
      status = exception.httpStatus;
      message = exception.message;
      errorData = exception.debugPayload;
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errorData = exception.stack;
    }

    res.status(status).json({
      statusCode: status,
      message,
      errors: errorData,
    });
  }
}
