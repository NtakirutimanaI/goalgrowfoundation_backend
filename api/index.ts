import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

const server = express();

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://goalgrowfoundation-frontend.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173'
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow other origins or fallback to avoid preflight crash
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  return server;
};

let cachedServer: any;

export default async (req: any, res: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
};
