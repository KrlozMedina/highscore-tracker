import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GameDto {
    @IsOptional()
    @Type(() => String)
    @ApiProperty({ description: 'Game', example: 'Mario Bross'})
    game?: string;
}

// export class PaginationQueryDto {
//     @IsOptional()
//     @IsPositive()
//     @Type(() => Number)
//     @ApiProperty({ description: 'Limit for page', example: 10 })
//     limit?: number;
  
//     @IsOptional()
//     @IsPositive()
//     @Type(() => Number)
//     @ApiProperty({ description: 'Select page', example: 1 })
//     page?: number;
//   }