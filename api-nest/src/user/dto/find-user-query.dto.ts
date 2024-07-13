import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { FindUserQueryDate } from 'src/common/enums/find-user-query-date.enum';

export class FindUserQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(FindUserQueryDate)
  @IsOptional()
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
