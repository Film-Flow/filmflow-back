import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthProvider } from '@prisma/client';
import {
  IsString,
  IsUUID,
  IsNotEmpty,
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
  @ApiPropertyOptional()
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
  @ApiPropertyOptional()
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
  @ApiPropertyOptional()
  sent_friendship_request?: Friendship[];

  @IsArray()
  @ApiPropertyOptional()
  received_friendship_request?: Friendship[];
}
