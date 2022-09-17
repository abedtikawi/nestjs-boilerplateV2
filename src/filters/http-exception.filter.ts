import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter
  implements ExceptionFilter<UnprocessableEntityException>
{
  constructor(public reflector: Reflector) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const r = exception.getResponse() as { message: ValidationError[] };
    response.status(300).json(r);
  }
}
