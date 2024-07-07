import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { ResetPassCodeService } from 'src/reset-pass-code/reset-pass-code.service';
import { VerifyEmailCodeService } from 'src/verify-email-code/verify-email-code.service';
import { VerifyEmailCodeModule } from 'src/verify-email-code/verify-email-code.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    MailerService,
    VerifyEmailCodeService,
    ResetPassCodeService,
  ],
  exports: [UserService],
  imports: [forwardRef(() => VerifyEmailCodeModule)],
})
export class UserModule {}
