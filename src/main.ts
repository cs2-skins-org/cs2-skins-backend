// Add this to your NestJS main.ts file
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  // Enable CORS for Angular frontend
  // In your NestJS main.ts
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
=======
  // Enable CORS so Angular frontend can access NestJS backend
  app.enableCors({
    origin: 'http://localhost:4200', // Angular dev server
    credentials: true,              // if using cookies or auth headers
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
>>>>>>> 45872b5e8441d2c62f9223e6877d22bdc569de6d
}
void bootstrap();
