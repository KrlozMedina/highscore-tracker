import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const config = new DocumentBuilder()
  .setTitle('Game Score Manager API')
  .setVersion('1.3.9')
  .setDescription('Swagger for Game Score manager')
  .setContact('Leidy Santos', 'https://krlozmedina.dev/', 'desarrollo070615@gmail.com')
  .setLicense('Apache 2.0', 'http://www.apache.org/licenses/LICENSE-2.0.html')
  .addServer('api/v1')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  app.enableVersioning().setGlobalPrefix('api/v1')
  app.enableCors()

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
