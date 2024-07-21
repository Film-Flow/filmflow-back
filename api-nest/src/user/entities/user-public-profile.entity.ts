import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsBoolean } from 'class-validator';

export class UserPublicProfile {
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
  @ApiPropertyOptional()
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
