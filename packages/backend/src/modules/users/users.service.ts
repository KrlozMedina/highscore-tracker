import { Injectable, NotFoundException } from '@nestjs/common';
// import { da, faker, tr } from '@faker-js/faker';
// import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatorDto } from '../scores/dto/paginator.dto';
import { ScoreDto } from '../scores/dto/score.dto';
import { PrismaService } from 'prisma/prisma.service';
import { trace } from 'console';
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
    constructor(private readonly prismaService: PrismaService) {
        // this.generateMockData();
    }

    private users: User[] = [];
    private scores: ScoreDto[] = [];

    // private generateMockData() {
    //     for (let i = 0; i < 100; i++) {
    //         this.users.push({
    //             id: uuidv4(),
    //             name: faker.company.name(),
    //             email: faker.internet.email(),
    //             username: faker.internet.userName(),
    //             role: 'Player',
    //             avatar: faker.image.avatar(),
    //             status: 'Active'
    //         })
    //     }
    // }

    async getAllUsers(paginationQuery: PaginationQueryDto) {
        const users = await this.prismaService.user
        .findMany()
        .then(data => {return data})

        const { limit = 10, page = 1 } = paginationQuery;
        const start = (page - 1) * limit;
        const end = Number(start) + Number(limit);
    
        const data = users.slice(start, end);
        const total = users.length;
        const totalPages = Math.ceil(total / limit);

        if (!users) {
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

    async getUserByUserId(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: { userId: userId },
            select: {
                name: true,
                username: true,
                email: true,
                roles: true,
                avatar: true,
                status: true
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {        
        const user = await this.prismaService.user.update({
            where: { userId: userId },
            data: updateUserDto
        })

        if (!user) {
            throw new NotFoundException('User not updated');
        }

        return user;
    }

    async enableUser(userId: string) {
        const date = new Date();
        var newStatus = '';

        const userStatus = await this.prismaService.user.findUnique({
            where: {userId: userId},
            select: {status: true}
        })

        if (userStatus.status==='active') {
            newStatus = 'inactive'
        } else if (userStatus.status!=='active') {
            newStatus = 'active'
        }

        const user = await this.prismaService.user.update({
            where: { userId: userId },
            data: { updatedAt: date.toISOString(), status: newStatus},
            select: {
                name: true,
                username: true,
                email: true,
                avatar: true,
                roles: true,
                status: true
            }
        })

        if (!user) {
            throw new NotFoundException('User not updated');
        }

        return user;
    }

    async lockUser(userId: string) {
        const date = new Date();
        const user = await this.prismaService.user.update({
            where: { userId: userId },
            data: { updatedAt: date.toISOString(), status: 'lock' },
            select: {
                name: true,
                username: true,
                email: true,
                avatar: true,
                roles: true,
            }
        })

        if (!user) {
            throw new NotFoundException('User not updated');
        }

        return user;
    }

    getUserById(id: string): User {
        return this.users.find(user => user.id === id);
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
