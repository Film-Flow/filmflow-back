import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, GoogleStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
