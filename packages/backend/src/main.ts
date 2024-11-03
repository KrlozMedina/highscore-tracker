import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning().setGlobalPrefix('api/v1')
  app.enableCors()

  const config = new DocumentBuilder()
  .setTitle('API for Scores')
  .setDescription('Document for API for Scores')
  .setVersion('1.2.1')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
