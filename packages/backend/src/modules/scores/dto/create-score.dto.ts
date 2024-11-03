import { ApiProperty } from "@nestjs/swagger";
import { Score } from "../scores.service";

export class CreateScoreDto {
    @ApiProperty({ description: 'UserId (UUID)' })
    readonly id: string;
    
    // @ApiProperty({ description: 'Username for the game' })
    // readonly username: string;

    @ApiProperty({ description: 'Name for the game' })
    readonly game: string;

    @ApiProperty({ description: 'Score for the game' })
    readonly score: Score;
}
export class UpdateScoresDto {
    @ApiProperty({description: "Update scores", example: "\n" +
        "  \"scoreId\": \"98dc92ff-1882-448f-87a4-e07175c624c4\""})
    score: number;
}

// export class UpdateScoreDto {
//     readonly id: string;
//     readonly username?: string;
//     readonly game?: string;
//     readonly score?: number;
// }