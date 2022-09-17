import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { Reflector } from '@nestjs/core';
import { extractor } from './extractors';
import rateLimit from 'express-rate-limit';
import { CUSTOM_VERSIONING_FIELD, DEV_ENV } from './common';
import { AppConfigService } from './shared/config.service';
import { serveSwagger } from './documentation/serve-swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

export async function middleware(
  app: INestApplication,
  applicationConfiguration: AppConfigService,
): Promise<INestApplication> {
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
  if (
    [
      VersioningType.CUSTOM,
      VersioningType.HEADER,
      VersioningType.MEDIA_TYPE,
      VersioningType.URI,
    ].includes(applicationConfiguration.versionType)
  ) {
    if (!CUSTOM_VERSIONING_FIELD) {
      Logger.error(`Please enter custom versioning field in common/index.ts`);
      await process.exit(1);
    }
    switch (applicationConfiguration.versionType) {
      case VersioningType.URI:
        app.enableVersioning({
          type: VersioningType.URI,
          prefix: CUSTOM_VERSIONING_FIELD,
        });
        break;
      case VersioningType.CUSTOM:
        app.enableVersioning({ type: VersioningType.CUSTOM, extractor });
        break;
      case VersioningType.HEADER:
        app.enableVersioning({
          type: VersioningType.HEADER,
          header: CUSTOM_VERSIONING_FIELD,
        });
        break;
      case VersioningType.MEDIA_TYPE:
        app.enableVersioning({
          type: VersioningType.MEDIA_TYPE,
          key: CUSTOM_VERSIONING_FIELD,
        });
        break;

      default:
        break;
    }
    if (DEV_ENV.includes(applicationConfiguration.env)) {
      await serveSwagger(app, applicationConfiguration);
    }
  }
  return app;
}
