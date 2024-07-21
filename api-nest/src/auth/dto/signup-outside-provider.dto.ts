import { ApiPropertyOptional } from '@nestjs/swagger';
import { AuthProvider } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class OutsideProviderDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  display_name: string;

  @IsString()
  @ApiPropertyOptional()
  photo?: string;

  @IsEnum(AuthProvider)
  @IsNotEmpty()
  auth_provider: AuthProvider;
}
