import { IsDate, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class VerifyEmailCode {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;

  @IsDate()
  @IsNotEmpty()
  expires_in: Date;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
