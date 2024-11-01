import { Controller, Get, Post, Query, Body, Param, HttpCode, Delete} from '@nestjs/common';
import { ScoresService, Score } from './scores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreDto } from './dto/score.dto';

@Controller('scores')
export class ScoreController {
    constructor(private scoreService: ScoresService){}

    @Get('/leaderboard')
    getScores(@Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getAllScores(paginationQuery);
    }

    @Post('/:id')
    createScore(@Body() createScoreDto: CreateScoreDto): ScoreDto{
        return this.scoreService.createScore(createScoreDto);
    }
}

@Controller('users/admin/scores')
export class ScoresByAdmin {
    constructor (private readonly scoreService: ScoresService) {}

    @Get()
    getScores(@Query() paginationQuery: PaginationQueryDto) {
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