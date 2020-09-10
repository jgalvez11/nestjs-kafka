import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { kafkaConnection } from './config/kafkaConnection.config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  app.connectMicroservice(kafkaConnection);
  app.enableCors();
  await app.startAllMicroservicesAsync();
  await app.listen(5000);
}
bootstrap();
