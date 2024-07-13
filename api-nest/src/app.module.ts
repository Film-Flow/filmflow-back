import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { validate } from './config/env.validation';
import { MailerModule } from './mailer/mailer.module';
import { VerifyEmailCodeModule } from './verify-email-code/verify-email-code.module';
import { ResetPassCodeModule } from './reset-pass-code/reset-pass-code.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    UserModule,
    FriendshipModule,
    AuthModule,
    VerifyEmailCodeModule,
    ResetPassCodeModule,
    MailerModule,
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
