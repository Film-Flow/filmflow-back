import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
        .setTitle('Film Flow Docs')
        .setDescription('Film Flow API description')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    const envService = app.get(EnvService)

    const port: number = Number(envService.get('PORT'))

    await app.listen(port)
}
bootstrap()
