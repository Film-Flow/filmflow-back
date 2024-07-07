import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider } from '@prisma/client';
import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class UserWithoutPassword {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'URL to the user image (opcional)',
  })
  image: string;

  @IsEnum(AuthProvider)
  @IsNotEmpty()
  @ApiProperty({
    enum: AuthProvider,
    enumName: 'AuthProvider',
  })
  auth_provider: AuthProvider;

  @IsBoolean()
  is_verified: boolean;

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
}
