import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ description: 'Limit for page', example: 10 })
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ description: 'Select page', example: 1 })
  page?: number;
}
