import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { changeErrorMessage } from './utils/errosMessageValidator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Film Flow')
    .setDescription('Docs for film flow API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          let errorMessage: string | null = changeErrorMessage({
            contraintKey: Object.keys(error.constraints)[0],
            property: error.property,
          });

          console.log(error);

          if (!errorMessage) {
            errorMessage = error.constraints[Object.keys(error.constraints)[0]];
          }

          return {
            property: error.property,
            message: errorMessage,
          };
        });

        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );

  await app.listen(3000);
  console.log('API runing on http://localhost:3000');
}
bootstrap();
