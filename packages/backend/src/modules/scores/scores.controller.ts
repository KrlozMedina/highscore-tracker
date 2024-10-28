import { Controller, Get, Post, Query, Body} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './dto/score';

@Controller('scores/leaderboard')
export class ScoresController {
    constructor(
        private scoreService: ScoresService
    ){}

    @Get()
    getScores(@Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getAllScores(paginationQuery);
    }

    @Post()
    createScore(@Body() createScoreDto: CreateScoreDto): Score{
        return this.scoreService.createScore(createScoreDto);
    }
}
