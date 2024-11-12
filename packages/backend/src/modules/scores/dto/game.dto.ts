import { ApiProperty } from '@nestjs/swagger';

export class GameDto {
    @ApiProperty({ description: 'Game', example: 'Mario Bross'})
    game: string;
}