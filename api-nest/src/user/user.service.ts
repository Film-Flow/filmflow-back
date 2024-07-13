import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { OutsideProviderDto } from 'src/auth/dto/signup-outside-provider.dto';
import { AuthProviderEnum } from 'src/common/enums/auth-provider.enum';
import { MailerService } from 'src/mailer/mailer.service';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { VerifyEmailCodeService } from 'src/verify-email-code/verify-email-code.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { User } from './entities/user.entity';
import { UserPublicProfile } from './entities/user-public-profile.entity';
import { FindUserQueryDto } from './dto/find-user-query.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private verifyEmailCodeService: VerifyEmailCodeService,
    private friendshipService: FriendshipService,
  ) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const password_hashed = await bcrypt.hash(data.password, salt);

    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();

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

  findProfile(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        sent_friendship_requests: {
          include: {
            addressee: {
              select: {
                name: true,
                nickname: true,
                image: true,
              },
            },
          },
        },
        received_friendship_requests: {
          include: {
            requester: {
              select: {
                name: true,
                nickname: true,
                image: true,
              },
            },
          },
        },
      },
    });
  }

  async findByIdWithConnection({
    logged_user_id,
    other_user_id,
  }: {
    logged_user_id: string;
    other_user_id: string;
  }): Promise<UserPublicProfile> {
    console.log({
      logged_user_id,
      other_user_id,
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id: other_user_id,
        is_verified: true,
      },
      select: {
        id: true,
        name: true,
        nickname: true,
        image: true,
        is_private: true,
        watch_list: {
          select: {
            image: true,
            title: true,
          },
        },
        ratings: {
          select: {
            rating: true,
            movie: {
              select: {
                title: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    const friendship = await this.friendshipService.findByIds({
      logged_user_id: logged_user_id,
      other_user_id: other_user_id,
    });

    if (user.is_private && friendship?.status !== 'ACCEPTED') {
      return {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        image: user.image,
        is_connected: false,
      };
    }

    return {
      ...user,
      is_connected: friendship.status === 'ACCEPTED' ? true : false,
    };
  }

  async findMany(findUserQueryDto: FindUserQueryDto, logged_user_id: string) {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: findUserQueryDto.name,
          mode: 'insensitive',
        },
        id: {
          not: logged_user_id,
        },
      },
      orderBy: {
        created_at: findUserQueryDto.date ? findUserQueryDto.date : 'desc',
      },
      skip: findUserQueryDto.init,
      take: findUserQueryDto.limit,
    });

    return users;
  }
}
