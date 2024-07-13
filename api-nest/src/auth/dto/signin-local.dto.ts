import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInLocalDto {
  @ApiProperty({
    example: 'icarocedraz7@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'teste123',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
