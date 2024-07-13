import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FriendshipUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsString()
  @IsOptional()
  email: string;
}
