import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateScoreDto, UpdateScoresDto } from './dto/create-score.dto';
import { ScoreDto } from './dto/score.dto';
import { PaginatorDto } from './dto/paginator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Scores } from './scores.schema';
import { Model } from 'mongoose';

export interface Score {
    id: string;
    // username: string;
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

    async getScores(): Promise<Scores[]> {
        return this.scoresModel.find().exec();
    }

    async createScore(createScoreDto: CreateScoreDto) {
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

    getBestScores(): Score[]  {
        return this.scores;
    }

    getAllScores(paginationQuery: PaginationQueryDto): PaginatorDto {
        const { limit = 10, page = 1 } = paginationQuery;
        const start = (page - 1) * limit;
        const end = Number(start) + Number(limit);
    
        const data = this.scores.slice(start, end);
        const total = this.scores.length;
        const totalPages = Math.ceil(total / limit);

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

    // createScore(createScoreDto: CreateScoreDto): ScoreDto{
    //     const newScore = {id: uuidv4(), ...createScoreDto};
    //     this.scores.push(newScore);
    //     return newScore;
    // }

    // updateScore(id: string, updateScoreDto: UpdateScoreDto): ScoreDto {
    //     const userIndex = this.scores.findIndex(user => user.id === id);
    //     if (userIndex === -1) {
    //         return null
    //     }
    //     this.scores[userIndex] = {...this.scores[userIndex], ...updateScoreDto};
    //     return this.scores[userIndex];
    // }

    deleteScoreById(id: string) {
        this.scores = this.scores.filter(score => score.id !== id);
    }
}
