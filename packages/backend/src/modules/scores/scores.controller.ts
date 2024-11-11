import { Controller, Get, Post, Query, Body, Param, HttpCode, Delete, Put, HttpStatus} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateScoreDto, UpdateScoresDto } from './dto/create-score.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Scores } from './scores.schema';

@ApiTags('Scores')
@Controller('scores')
export class ScoreController {
    constructor(private scoreService: ScoresService){}

    @Get('leaderboard')
    @ApiOperation({summary: 'Get better scores'})
    @ApiResponse({status: 200, description: 'Global scores uploaded successfully'})
    @ApiResponse({status: 400, description: 'Invalid data'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Valid token, no permission for this action'})
    async getScores(@Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getBetterScores(paginationQuery);
    }

    @Get(':scoreId')
    @ApiOperation({summary: 'get Score by Id'})
    @ApiResponse({status: 200, description: 'Score by Id', type: Scores} )
    async getScoreById(@Param('scoreId') scoreId: string) {
        return this.scoreService.getScoreById(scoreId);
    }

    @Post()
    @ApiOperation({ summary: 'Create new score' })
    @ApiResponse({ status: 201, description: 'Create score', type: Scores})
    @ApiResponse({status: 400, description: 'Invalid data'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Valid token, no permission for this action'})
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
}

@ApiTags('Users')
@Controller('users')
export class ScoresByAdmin {
    constructor(private readonly scoreService: ScoresService) {}

    @Get('scores/:userId')
    @ApiOperation({summary: 'Get scores', description: 'Get scores of user by user ID', operationId: 'scores'})
    @ApiResponse({status: 200, description: 'User data uploaded successfully'})
    @ApiResponse({status: 400, description: 'User bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async getScoresByUserId(@Param('userId') userId: string, @Query() paginationQuery: PaginationQueryDto) {
        return this.scoreService.getScoreByUserId(userId, paginationQuery)
    }

    @Delete('admin/scores/:scoreId')
    @ApiOperation({summary: 'Delete specific score', description: 'Delete specific score by admin'})
    @ApiResponse({status: 200, description: 'Score removed successfully'})
    @ApiResponse({status: 400, description: 'User bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Valid token, no permission for this action'})
    async deleteScoreByAdmin(@Param('scoreId') scoreId: string) {
        return this.scoreService.deleteScore(scoreId)
    }
}