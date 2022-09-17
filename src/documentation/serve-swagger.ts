import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from 'src/shared/config.service';

export async function serveSwagger(
  app: INestApplication,
  applicationConfiguration: AppConfigService,
): Promise<void> {
  const { port, name, baseURL } = applicationConfiguration;

  const config = new DocumentBuilder()
    .setTitle(` Microservice`)
    .setTitle(`${name} Microservice`)
    .setDescription(`${name} Microservice documentation `)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const path = 'api';
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  Logger.log(`Serving Documentation on ${baseURL}:${port}/${path}`, 'Swagger');
}
