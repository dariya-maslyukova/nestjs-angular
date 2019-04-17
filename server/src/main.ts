import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { join } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  // TODO: POST/PUT files doesn't work if FastifyAdapter() use
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter(),
  );
  // const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cardin Shop')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .setHost(hostDomain.split('//')[1])
    .setSchemes(AppModule.isDev ? 'http' : 'https')
    .setBasePath('/api')
    .addBearerAuth('Authorization', 'header')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/api/docs', app, swaggerDoc, {
    swaggerUrl: `${hostDomain}/api/docs-json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // -------Fastify
  // TODO: POST/PUT files doesn't work if useStaticAssets use
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  await app.listen(AppModule.port);
}

bootstrap();
