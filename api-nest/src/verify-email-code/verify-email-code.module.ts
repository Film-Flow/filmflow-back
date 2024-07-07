import { forwardRef, Module } from '@nestjs/common';
import { VerifyEmailCodeService } from './verify-email-code.service';
import { VerifyEmailCodeController } from './verify-email-code.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [VerifyEmailCodeController],
  providers: [VerifyEmailCodeService, PrismaService, MailerService],
  exports: [VerifyEmailCodeService],
  imports: [forwardRef(() => UserModule)],
})
export class VerifyEmailCodeModule {}
