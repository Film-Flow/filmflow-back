import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindFriendshipDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  logged_user_id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  other_user_id: string;
}
