import { AuthProvider } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class User {
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
  @IsNotEmpty()
  password_hash: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsEnum(AuthProvider)
  @IsNotEmpty()
  auth_provider: AuthProvider;

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
}
