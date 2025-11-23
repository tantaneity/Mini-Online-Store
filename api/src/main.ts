import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { globalValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(globalValidationPipe);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Mini Online Store API')
    .setDescription('API documentation for Mini Online Store')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('mini-store/api/docs', app, document);

  const port = process.env.PORT || 7010;
  await app.listen(port);

  console.log(
    `Application is running on: http://localhost:${port}/mini-store/api`,
    `Swagger documentation: http://localhost:${port}/mini-store/api/docs`,
  );
}
void bootstrap();
