import { Controller, Get, Post, Query, Body, Param, HttpCode, Delete} from '@nestjs/common';
import { ScoresService, Score } from './scores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateScoreDto } from './dto/create-score.dto';
// import { Score } from './dto/score';

@Controller('scores/leaderboard')
export class LeaderBoardController {
    constructor(private scoreService: ScoresService){}

    @Get()
    getScores(@Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getAllScores(paginationQuery);
    }
}

@Controller('scores')
export class ScoreController {
    constructor (private readonly scoreService: ScoresService) {}

    @Post(':id')
    createScore(@Param('id') id: string, @Body() createScoreDto: CreateScoreDto): Score {
        return this.scoreService.createScore(id, createScoreDto);
    }
}

@Controller('users/admin/scores')
export class ScoresByAdmin {
    constructor (private readonly scoreService: ScoresService) {}

    @Get()
    getScores(@Query() paginationQuery: PaginationQueryDto) {
        console.log('hola')
        return this.scoreService.getAllScores(paginationQuery);
    }

    @Get(':userId')
    getScoreById(@Param('userId') id: string): Score | undefined {
        return this.scoreService.getAllScoresByUserId(id);
    }

    @Delete(':userId')
    @HttpCode(204)
    deleteScore(@Param('userId') id: string): void {
        this.scoreService.deleteScoreById(id);
    }
}