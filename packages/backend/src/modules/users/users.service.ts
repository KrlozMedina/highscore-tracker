import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatorDto } from '../scores/dto/paginator.dto';
import { ScoreDto } from '../scores/dto/score.dto';
import { PaginatorScoreDto } from '../scores/dto/paginatorScore.dto';
export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    role: string;
    avatar: string;
    status: string;
}

export interface Paginator {
    data: [];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

@Injectable()
export class UsersService {
    constructor() {
        this.generateMockData();
    }

    private users: User[] = [];
    private scores: ScoreDto[] = [];

    private generateMockData() {
        for (let i = 0; i < 100; i++) {
            this.users.push({
                id: uuidv4(),
                name: faker.company.name(),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                role: 'Player',
                avatar: faker.image.avatar(),
                status: 'Active'
            })
        }
    }

    getAllUsers(paginationQuery: PaginationQueryDto): Paginator {
        const { page = 1, limit = 10 } = paginationQuery;        
        const start = (page - 1) * limit;
        const end = Number(start) + Number(limit);

        const data = this.users.slice(start, end);
        const total = this.users.length;
        const totalPages = Math.ceil(total / limit);

        return <Paginator>{
            data,
            total,
            page,
            limit,
            totalPages,
        }
    }

    getUserById(id: string): User {
        return this.users.find(user => user.id === id);
    }

    createUser(createUserDto: CreateUserDto): User {
        const newUser = {id: uuidv4(), role: 'Player', status: 'Active', ...createUserDto};
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: string, updateUserDto: UpdateUserDto): User {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null
        }
        this.users[userIndex] = {...this.users[userIndex], ...updateUserDto};
        return this.users[userIndex];
    }
    
    deleteUser(id: string): void {
        this.users = this.users.filter(user => user.id !== id)
    }

    getScoresByUser(paginationQuery: PaginationQueryDto): PaginatorDto {
        const { limit = 10, page = 1 } = paginationQuery;
        const start = (page - 1) * limit;
        const end = start + limit;
    
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
}
