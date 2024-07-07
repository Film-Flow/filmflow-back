import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { OutsideProviderDto } from 'src/auth/dto/signup-outside-provider.dto';
import { AuthProviderEnum } from 'src/common/enums/auth-provider.enum';
import { MailerService } from 'src/mailer/mailer.service';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { VerifyEmailCodeService } from 'src/verify-email-code/verify-email-code.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private verifyEmailCodeService: VerifyEmailCodeService,
  ) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const password_hashed = await bcrypt.hash(data.password, salt);

    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

    const verifyEmailCode = await this.verifyEmailCodeService.create({
      email: data.email,
      code: randomCode,
    });

    if (!verifyEmailCode) {
      throw new HttpException(MessagesHelper.INTERNAL_SERVER_ERROR, 500);
    }

    await this.mailerService.sendEmail({
      to: data.email,
      subject: 'Welcome to Film Flow!',
      message: `O seu código de verificação de email é: ${randomCode}`,
    });

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: password_hashed,
        nickname: data.nickname ?? undefined,
        image: data.image ?? undefined,
        auth_provider: AuthProviderEnum.LOCAL,
      },
    });

    return {
      user,
      expires_in: verifyEmailCode.expires_in,
    };
  }

  createUserFromOutsideProvider(data: OutsideProviderDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: data.display_name,
        email: data.email,
        image: data.photo ?? undefined,
        auth_provider: AuthProviderEnum.LOCAL,
        is_verified: true,
      },
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  findById(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
