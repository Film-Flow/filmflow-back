import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FriendshipUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiPropertyOptional()
  nickname: string;

  @IsString()
  @ApiPropertyOptional()
  email: string;
}
