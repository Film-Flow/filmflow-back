import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { validate } from './config/env.validation';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
    }),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
