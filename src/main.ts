import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// NEED TO CHECK AUTH PROBLEM

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'debug'],
  });

  const config = new DocumentBuilder()
    .setTitle('User Api')
    .setDescription(
      'User CRUD API with mongodb support, image upload and authentication',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
