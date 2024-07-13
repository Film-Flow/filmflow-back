import { ApiProperty } from '@nestjs/swagger';
import { AuthProvider } from '@prisma/client';
import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Friendship } from 'src/friendship/entities/friendship.entity';

export class UserWithoutPassword {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(AuthProvider)
  @IsNotEmpty()
  @ApiProperty({
    enum: AuthProvider,
    enumName: 'AuthProvider',
  })
  auth_provider: AuthProvider;

  @IsBoolean()
  is_verified: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'URL to the user image (opcional)',
  })
  image: string;

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsDate()
  @IsNotEmpty()
  updated_at: Date;

  @IsArray()
  @IsOptional()
  sent_friendship_request?: Friendship[];

  @IsArray()
  @IsOptional()
  received_friendship_request?: Friendship[];
}
