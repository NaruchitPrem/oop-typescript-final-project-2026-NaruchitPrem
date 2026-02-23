import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger/OpenAPI documentation (ปรับแต่งให้เข้ากับ Model Set 3 ของเรา)
  const config = new DocumentBuilder()
    .setTitle('Event Management System')
    .setDescription('OOP Final Project - ระบบจัดการกิจกรรม (Model Set 3)')
    .addTag('Events', 'ระบบจัดการกิจกรรม (Admin)')
    .addTag('Participants Management', 'ดูข้อมูลผู้ใช้งานทั้งหมด (Admin)')
    .addTag('Auth & Participants', 'ระบบสมัครสมาชิกและจัดการผู้ใช้ (Participant)')
    .addTag('Reservations', 'ระบบการจองและยกเลิกกิจกรรม')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();