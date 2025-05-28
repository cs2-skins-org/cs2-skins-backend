import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so Angular frontend can access NestJS backend
  app.enableCors({
    origin: 'http://localhost:4200', // Angular dev server
    credentials: true,              // if using cookies or auth headers
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
