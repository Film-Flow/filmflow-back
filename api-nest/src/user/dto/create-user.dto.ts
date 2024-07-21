import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @ApiPropertyOptional()
  nickname?: string;

  @IsString()
  @ApiPropertyOptional()
  @ApiProperty({
    description: 'URL to the user image (optional)',
  })
  image?: string;
}
