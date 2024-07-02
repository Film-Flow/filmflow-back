import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailAlreadyExists } from './validations/email-already-exists.validator';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailAlreadyExists],
})
export class UserModule {}
