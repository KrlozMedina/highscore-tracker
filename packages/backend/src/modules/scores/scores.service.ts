import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { v4 as uuidv4 } from 'uuid';
import { Score } from './dto/score';
import { Paginator } from './dto/paginator';

@Injectable()
export class ScoresService {

    constructor(){
        this.generateMockData();
    }

    private scores: Score[] = [];

    private generateMockData() {
        for (let i = 0; i < 100; i++) {
            this.scores.push({
                id: uuidv4(),
                username: faker.company.name(),
                game: faker.company.name(),
                score: faker.number.int()
            })
        }
    }

    getAllScores(paginationQuery: PaginationQueryDto): Paginator {
        const { limit = 10, page = 1 } = paginationQuery;
        const start = (page - 1) * limit;
        const end = start + limit;
    
        const data = this.scores.slice(start, end);
        const total = this.scores.length;
        const totalPages = Math.ceil(total / limit);

        return <Paginator> {
         data,
         total,
         page,
         limit,
         totalPages,
        }   
    }

    getScoreById(id: string): Score {
        return this.scores.find(score => score.id === id);
    }

    updateScoreById(id: string, updateData: Score) {
        const score = this.getScoreById(id);
        if (score) {
          Object.assign(score, updateData);
        }
    }

    deleteScoreById(id: string) {
        this.scores = this.scores.filter(score => score.id !== id);
    }
}
