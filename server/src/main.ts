import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import {DatabaseService} from './core/database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const databaseService = app.get(DatabaseService);
  // await databaseService.seed();

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }))

  await app.listen(3000);
}
bootstrap();
