import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateVerifyEmailCodeDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
