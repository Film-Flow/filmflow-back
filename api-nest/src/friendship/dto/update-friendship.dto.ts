import { IsEnum, IsNotEmpty } from 'class-validator';
import { FriendshipStatus } from '@prisma/client';
import { FindFriendshipDto } from './find-friendship.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFriendshipDto extends FindFriendshipDto {
  @ApiProperty({ enum: FriendshipStatus, enumName: 'FriendshipStatus' })
  @IsEnum(FriendshipStatus)
  @IsNotEmpty()
  status: FriendshipStatus;
}
