import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Invest+')
    .setDescription('plataforma de investimentos')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'enter your JWT token',
      },
      'JWT-auth',
    )
    .build();
  // .addApiKey({ type: 'apiKey', name: 'API_KEY', in: 'header' }, 'api_key')

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    // origin: '*',
    origin: 'http://localhost:3000',
  });
  await app.listen(3333);
}
bootstrap();
