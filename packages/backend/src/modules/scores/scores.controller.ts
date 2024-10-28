import { Controller, Get, Query} from '@nestjs/common';
import { Score, ScoresService } from './scores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('scores/leaderboard')
export class ScoresController {
    constructor(
        private scoreService: ScoresService
    ){}

    @Get()
    getScores(@Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getAllScores(paginationQuery);
    }
}
