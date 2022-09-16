import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { middleware } from './app.middleware';
import { AppConfigService } from 'src/shared/config.service';
import { serveSwagger } from './documentation/serve-swagger';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  await app.init();

  const appConfig = app.get(AppConfigService);

  await middleware(app);

  if (['development', 'staging', 'testing'].includes(appConfig.env)) {
    await serveSwagger(app, appConfig.name);
    Logger.log(
      `Serving Documentation: http://localhost:${appConfig.port}/api`,
      'Swagger',
    );
  }
  await app.listen(appConfig.port);

  return await app.getUrl();
}
(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    Logger.log(`Application running on: ${url}`, 'Bootstrap');
  } catch (error) {
    Logger.error(error.message, 'Bootstrap');
  }
})();
