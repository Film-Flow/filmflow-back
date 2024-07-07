import { Module } from '@nestjs/common';
import { ResetPassCodeService } from './reset-pass-code.service';
import { ResetPassCodeController } from './reset-pass-code.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ResetPassCodeController],
  providers: [ResetPassCodeService, PrismaService],
  exports: [ResetPassCodeService],
})
export class ResetPassCodeModule {}
