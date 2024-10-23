import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning().setGlobalPrefix('api/v1')
  app.enableCors()
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
