// import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
// import { v4 as uuidv4 } from 'uuid';
import { CreateScoreDto, UpdateScoresDto } from './dto/create-score.dto';
import { ScoreDto } from './dto/score.dto';
import { PaginatorDto } from './dto/paginator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Scores } from './scores.schema';
import { Model } from 'mongoose';
import { GameDto } from './dto/game.dto';

export interface Score {
    id: string;
    game: string;
    score: number;
}
@Injectable()
export class ScoresService {
    constructor(@InjectModel(Scores.name) private scoresModel: Model<Scores>) {
        // this.generateMockData();
    }

    private scores: ScoreDto[] = [];

    // private generateMockData() {
    //     for (let i = 0; i < 100; i++) {
    //         this.scores.push({
    //             id: uuidv4(),
    //             username: faker.company.name(),
    //             game: faker.company.name(),
    //             score: faker.number.int()
    //         })
    //     }
    // }

    async getScores(paginationQuery: PaginationQueryDto) {
        const scores = await this.scoresModel
        .find()
        .select({_id: 0, scoreId: 1, userId: 1,game: 1, score: 1})
        .exec();

        const { limit = 10, page = 1 } = paginationQuery;
        const start = (page - 1) * limit;
        const end = Number(start) + Number(limit);
    
        const data = scores.slice(start, end);
        const total = scores.length;
        const totalPages = Math.ceil(total / limit);

        if (!scores) {
            throw new NotFoundException('Score not found');
        }

        return <PaginatorDto> {
            data,
            total,
            page,
            limit,
            totalPages,
        }  
    }

    async createScore(createScoreDto: CreateScoreDto) {
        console.log(createScoreDto)
        const score = new this.scoresModel(createScoreDto);
        return score.save();
    }

    async getScoreById(scoreId: string): Promise<Scores> {
        const score = await this.scoresModel
        .findOne({scoreId: scoreId})
        .select({scoreId: 1, _id: 0,game: 1, score: 1});
    
        if (!score) {
        throw new NotFoundException('Score not found');
        }
        return score;
    }

    async getScoreByUserId(userId: string, paginationQuery: PaginationQueryDto) {
        const score = await this.scoresModel
        .find({userId: userId})
        .select({_id: 0,scoreId: 1, game: 1, score: 1, createdAt: 1});
        
        const { limit = 10, page = 1 } = paginationQuery;
        const start = (page - 1) * limit;
        const end = start + limit;
    
        const data = score.slice(start, end);
        const total = score.length;
        const totalPages = Math.ceil(total / limit);

        if (!score) {
            throw new NotFoundException('Score not found');
        }

        return <PaginatorDto> {
            data,
            total,
            page,
            limit,
            totalPages,
        }  
    }

    async updateScore(scoreId: string, updateScoreDto: UpdateScoresDto) {
    const updateScore = await this.scoresModel.updateOne(
        {scoreId: scoreId}, updateScoreDto);

    if (!updateScore) {
        throw new NotFoundException('Score not found');
    }
    return this.getScoreById(scoreId);
    }

    async deleteScore(scoreId: string): Promise<void> {        
        const result = await this.scoresModel.findOneAndDelete({scoreId: scoreId}).exec();
        if (!result) {
            throw new NotFoundException('Score not found');
        }
    }

    async getBetterScores(paginationQuery: PaginationQueryDto) {
        const scores = await this.scoresModel
        .find()
        .select({_id: 0, scoreId: 1, userId: 1,game: 1, score: 1})
        .exec();

        const { limit = 10, page = 1 } = paginationQuery;
        const start = (page - 1) * limit;
        const end = Number(start) + Number(limit);
    
        const data = scores.slice(start, end);
        const total = scores.length;
        const totalPages = Math.ceil(total / limit);

        if (!scores) {
            throw new NotFoundException('Score not found');
        }

        return <PaginatorDto> {
            data,
            total,
            page,
            limit,
            totalPages,
        }  
    }

    getAllScoresByUserId(id: string): Score {
        return this.scores.find(score => score.id == id);
    }

    async getBestScores(game: GameDto){
        const pipeline = [
            {$match: game},
            {
                $group: {
                    _id: '$userId',
                    bestScore: {$max: "$score"}
                }
            },
            {
                $project: {_id: 1, game: game, bestScore: 1}
            },
            {
                $sort: {bestScore: -1 as -1}
            },
            {
                $limit: 10
            }
        ];  
        return await this.scoresModel.aggregate(pipeline).exec();
    }
}
