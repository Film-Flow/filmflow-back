import { IsNotEmpty, IsString } from 'class-validator';

export class AuthEntity {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
