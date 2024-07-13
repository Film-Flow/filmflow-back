import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFriendshipDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  addressee_id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  requester_id: string;
}
