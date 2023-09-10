import { NestFactory, Reflector } from '@nestjs/core';
import {
  ValidationPipe,
  Logger,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DatabaseService as database } from './database/database.service';
import { AppModule } from './app.module';

const logger: Logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  const PORT =
    configService.get<number>('PORT') || (process.env.PORT as any) || 5000;

  const config = new DocumentBuilder()
    .setTitle('Pioneer - A Todo application')
    .setDescription('The Pioneer API Reference')
    .setVersion('1.0')
    .addTag('Pioneer API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
  await database.connect();
}

bootstrap()
  .then(() => logger.log('[Server]: Server initialization successful...'))
  .catch((e) => {
    logger.error(`[Server]: Server initialization failed: ${e.message}...`);
  });
