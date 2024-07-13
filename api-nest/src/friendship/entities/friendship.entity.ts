import { FriendshipStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { FriendshipUserDto } from '../dto/friendship-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class Friendship {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  requester_id: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  addressee_id: string;

  @IsEnum(FriendshipStatus)
  @IsNotEmpty()
  @ApiProperty({
    enum: FriendshipStatus,
    enumName: 'FriendshipStatus',
  })
  status: FriendshipStatus;

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsDate()
  @IsNotEmpty()
  updated_at: Date;

  @IsNotEmpty()
  addressee: FriendshipUserDto;

  @IsNotEmpty()
  requester: FriendshipUserDto;
}
