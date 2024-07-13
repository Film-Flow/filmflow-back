import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { FindFriendshipDto } from './dto/find-friendship.dto';

@Injectable()
export class FriendshipService {
  constructor(private prismaService: PrismaService) {}

  create(createFriendshipDto: CreateFriendshipDto) {
    return this.prismaService.friendship.create({
      data: {
        addressee_id: createFriendshipDto.addressee_id,
        requester_id: createFriendshipDto.requester_id,
      },
    });
  }

  async findByIds(findFriendshipDto: FindFriendshipDto) {
    const friendship = await this.prismaService.friendship.findFirst({
      where: {
        OR: [
          {
            requester_id: findFriendshipDto.other_user_id,
            addressee_id: findFriendshipDto.logged_user_id,
          },
          {
            requester_id: findFriendshipDto.logged_user_id,
            addressee_id: findFriendshipDto.other_user_id,
          },
        ],
      },
    });

    if (!friendship) {
      throw new NotFoundException(MessagesHelper.FRIENDSHIP_NOT_FOUND);
    }

    return friendship;
  }

  async update(updateFriendshipDto: UpdateFriendshipDto) {
    const friendship = await this.findByIds({
      logged_user_id: updateFriendshipDto.logged_user_id,
      other_user_id: updateFriendshipDto.other_user_id,
    });

    return this.prismaService.friendship.update({
      where: {
        id: friendship.id,
      },
      data: { status: updateFriendshipDto.status },
    });
  }
}
