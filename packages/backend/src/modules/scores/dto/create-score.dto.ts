export class CreateScoreDto {
    readonly id: string;
    readonly username: string;
    readonly game: string;
    readonly score: number;
}

export class UpdateScoreDto {
    readonly id: string;
    readonly username?: string;
    readonly game?: string;
    readonly score?: number;
}