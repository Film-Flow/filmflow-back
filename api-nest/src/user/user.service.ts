import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { OutsideProviderDto } from 'src/auth/dto/signup-outside-provider.dto';
import { AuthProviderEnum } from 'src/common/enums/auth-provider.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: password_hash,
        nickname: data.nickname ?? undefined,
        image: data.image ?? undefined,
        auth_provider: AuthProviderEnum.LOCAL,
      },
    });
  }

  createUserFromOutsideProvider(data: OutsideProviderDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: data.display_name,
        email: data.email,
        image: data.photo ?? undefined,
        auth_provider: AuthProviderEnum.LOCAL,
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
