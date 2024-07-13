import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UserPublicProfile {
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
  @IsOptional()
  @ApiProperty({
    description: 'URL to the user image (opcional)',
  })
  image: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: 'boolean',
  })
  is_connected: boolean;
}
