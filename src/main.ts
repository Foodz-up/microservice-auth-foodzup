import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = 8888;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
