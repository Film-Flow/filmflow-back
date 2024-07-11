import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateVerifyEmailCodeDto } from './dto/create-verify-email-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { VerifyEmailCode } from './entities/verify-email-code.entity';

@Injectable()
export class VerifyEmailCodeService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailerService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async create({
    email,
    code,
  }: CreateVerifyEmailCodeDto): Promise<VerifyEmailCode> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }
    return this.prismaService.verifyEmailCode.create({
      data: {
        code,
        expires_in: new Date(Date.now() + 1000 * 60 * 5), // 5 minutos
        user: {
          connect: {
            email,
          },
        },
      },
    });
  }

  async resendCode(email: string): Promise<void> {
    const verifyEmailCode = await this.prismaService.verifyEmailCode.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    if (verifyEmailCode?.expires_in > new Date()) {
      throw new UnauthorizedException(
        MessagesHelper.VERIFY_EMAIL_CODE_NOT_EXPIRED,
      );
    }

    const user = await this.userService.findByEmail(email);

    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prismaService.verifyEmailCode.upsert({
      where: {
        user_id: user.id,
      },
      update: {
        code: randomCode,
        expires_in: new Date(Date.now() + 1000 * 60 * 5), // 5 minutos
      },
      create: {
        code: randomCode,
        expires_in: new Date(Date.now() + 1000 * 60 * 5), // 5 minutos
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await this.mailerService.sendEmail({
      to: email,
      subject: 'Welcome to Film Flow!',
      message: `O seu código de verificação de email é: ${randomCode}`,
    });
  }

  async verifyCode({ email, code }: VerifyCodeDto) {
    const verifyEmailCode = await this.prismaService.verifyEmailCode.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    if (!verifyEmailCode) {
      throw new NotFoundException(MessagesHelper.VERIFY_EMAIL_CODE_NOT_FOUND);
    }

    if (verifyEmailCode.expires_in < new Date()) {
      throw new UnauthorizedException(MessagesHelper.VERIFY_EMAIL_CODE_EXPIRED);
    }

    if (verifyEmailCode.code !== code) {
      throw new UnauthorizedException(MessagesHelper.INVALID_VERIFY_EMAIL_CODE);
    }

    return true;
  }
}
