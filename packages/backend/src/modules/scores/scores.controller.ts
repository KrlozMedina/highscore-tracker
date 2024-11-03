import { Controller, Get, Post, Query, Body, Param, HttpCode, Delete, Put, HttpStatus} from '@nestjs/common';
import { ScoresService, Score } from './scores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateScoreDto, UpdateScoresDto } from './dto/create-score.dto';
import { ScoreDto } from './dto/score.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Scores } from './scores.schema';

@ApiTags('Scores')
@Controller('scores')
export class ScoreController {
    constructor(private scoreService: ScoresService){}

    @Get()
    @ApiOperation({ summary: 'Get all scores for a score' })
    async getAllScores(): Promise<Scores[]> {
        return this.scoreService.getScores();
    }

    @Get('/leaderboard')
    getScores(@Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getAllScores(paginationQuery);
    }

    @Get(':scoreId')
    @ApiOperation({summary: 'get Score by Id'})
    @ApiResponse({status: 200, description: 'Score by Id', type: Scores} )
    async getScoreById(@Param('scoreId') scoreId: string) {
        return this.scoreService.getScoreById(scoreId);
    }

    @Post()
    @ApiOperation({ summary: 'Create score' })
    @ApiResponse({ status: 201, description: 'Create score', type: Scores})
    async createScore(@Body() createScoreDto: CreateScoreDto) {
        return this.scoreService.createScore(createScoreDto);
    }

    @Put(':scoreId')
    @ApiOperation({summary: 'Update score'})
    @ApiResponse({status: 200, description: 'Update Score by ScoreId', type: Scores} )
    async updateScore(@Param('scoreId') scoreId: string,
                        @Body() updateScoreDto: UpdateScoresDto) {
        return this.scoreService.updateScore(scoreId, updateScoreDto);
    }

    @Delete(':scoreId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({summary: 'Delete score'})
    @ApiResponse({status: 204, description: 'Delete Score by ScoreId'} )
    async deleteScore(@Param('scoreId') scoreId: string) {
        return this.scoreService.deleteScore(scoreId);
    }

    // @Post('/:id')
    // createScore(@Body() createScoreDto: CreateScoreDto): ScoreDto{
    //     return this.scoreService.createScore(createScoreDto);
    // }
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