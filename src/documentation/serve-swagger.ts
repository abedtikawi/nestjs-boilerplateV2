import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function serveSwagger(
  app: INestApplication,
  applicationName: string,
): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle(` Microservice`)
    .setTitle(`${applicationName} Microservice`)
    .setDescription(`${applicationName} Microservice documentation `)
    .setVersion('1.0') // this should be removed, create space for other versions
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
