import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { changeErrorMessage } from './utils/errosMessageValidator';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Film Flow')
    .setDescription('Docs for film flow API')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // app.useGlobalFilters(new PrismaExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          let errorMessage: string | null = changeErrorMessage({
            contraintKey: Object.keys(error.constraints)[0],
            property: error.property,
          });

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

  app.enableCors({
    origin: '*', // Ou especifique domínios específicos em vez de '*'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const configService = app.get(ConfigService);

  const port = configService.get<string>('PORT');

  await app.listen(port);
  console.log(`
    API runing on http://localhost:${port}
    DOCS runing on http://localhost:${port}/docs
  `);
}
bootstrap();
