import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, PrismaService],
  exports: [FriendshipService],
})
export class FriendshipModule {}