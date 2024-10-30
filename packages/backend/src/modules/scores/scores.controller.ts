import { Controller, Get, Post, Query, Body} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreDto } from './dto/score.dto';

@Controller('scores')
export class ScoresController {
    constructor(
        private scoreService: ScoresService
    ){}

    @Get('/leaderboard')
    getScores(@Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getAllScores(paginationQuery);
    }

    @Post('/:id')
    createScore(@Body() createScoreDto: CreateScoreDto): ScoreDto{
        return this.scoreService.createScore(createScoreDto);
    }
}
