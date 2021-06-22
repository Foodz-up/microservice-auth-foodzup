import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = 8888;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log('Running on port ' + port);
}
bootstrap();
