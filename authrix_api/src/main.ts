import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Key Management API')
    .setDescription('API для управления ключами и пользователей')
    .setVersion('1.0')
    .addTag('keys')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // API будет доступно по /api

  await app.listen(process.env.PORT || 10000);
}

bootstrap();
