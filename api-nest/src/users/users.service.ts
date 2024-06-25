import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                password_hash: createUserDto.password,
                email: createUserDto.email,
                nickname: createUserDto.nickname,
            },
            include: {
                watch_list: true,
            },
        })

        return user
    }
}
