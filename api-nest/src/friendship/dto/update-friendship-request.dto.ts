import { ApiProperty } from '@nestjs/swagger';
import { FriendshipStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateFriendshipRequestDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  other_user_id: string;

  @ApiProperty({ enum: FriendshipStatus, enumName: 'FriendshipStatus' })
  @IsEnum(FriendshipStatus)
  @IsNotEmpty()
  status: FriendshipStatus;
}
