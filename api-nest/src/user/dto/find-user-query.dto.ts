import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { FindUserQueryDate } from 'src/common/enums/find-user-query-date.enum';

export class FindUserQueryDto {
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsEnum(FindUserQueryDate)
  @ApiPropertyOptional()
  date?: FindUserQueryDate;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  init: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Max(50)
  @Min(0)
  limit: number;
}
