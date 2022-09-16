declare const module: any;
import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { Reflector } from '@nestjs/core';
import rateLimit from 'express-rate-limit';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

export function middleware(app: INestApplication): INestApplication {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => {
          Logger.log(message);
        },
      },
    }),
  );
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 100,
      max: 100,
    }),
  );
  const reflector = app.get(Reflector);
  app.useGlobalFilters(new HttpExceptionFilter(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  return app;
}
