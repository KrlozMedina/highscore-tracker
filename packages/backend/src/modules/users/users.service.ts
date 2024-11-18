import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
// import { da, faker, tr } from '@faker-js/faker';
// import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PaginatorDto } from '../scores/dto/paginator.dto';
import { ScoreDto } from '../scores/dto/score.dto';
import { PrismaService } from 'prisma/prisma.service';
import { hash, compare } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import { join } from 'path';
import { Response } from 'express';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  roles: string[];
  avatar: string;
  status: string;
  password: string;
}

export interface Paginator {
  data: [];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export enum status {
  'ACTIVE',
  'INACTIVE',
  'BLOCKED',
}

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private users: User[] = [];
  private scores: ScoreDto[] = [];

  async createUser(createUser: CreateUserDto) {
    const pass = await hash(createUser.password, 10);
    let roles = [];
    let user;

    createUser.roles = ['PLAYER'];

    for (const [string, value] of Object.entries(createUser?.roles)) {
      const role = await this.prismaService.role.findUnique({
        where: { name: value.toString() },
      });

      roles.push({ id: role?.id });
    }

    try {
      user = await this.prismaService.user.create({
        data: {
          name: createUser?.name,
          username: createUser?.username,
          password: pass,
          email: createUser?.email,
          roles: {
            connect: roles,
          },
          avatar: 'avatar.avif',
        },
      });
    } catch (error) {
      if (error.meta.target[0] === 'email') {
        throw new ConflictException('Conflict for email', 'User Conflict');
      }
    }

    return this.getUserByUserId(user.userId);
  }

  async getUserByUserId(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { userId: userId },
      select: {
        name: true,
        username: true,
        email: true,
        roles: {
          select: { name: true },
        },
        avatar: true,
        status: true,
      },
    });

    let roles = [];
    for (const [key, value] of Object.entries(user?.roles)) {
      roles.push(value?.name);
    }

    user.roles = roles;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getAllUsers(paginationQuery: PaginationQueryDto) {
    let users = [];
    const items = await this.prismaService.user.findMany({
      where: {
        OR: [{ status: 'ACTIVE' }, { status: 'BLOCKED' }],
      },
      select: {
        name: true,
        email: true,
        username: true,
        password: true,
        avatar: true,
        userId: true,
        status: true,
        roles: {
          select: { name: true },
        },
      },
    });

    items.forEach((item) => {
      let roles = [];
      for (const [key, value] of Object.entries(item?.roles)) {
        roles.push(value?.name);
      }

      item.roles = roles;
      users.push(item);
    });

    const { limit = 10, page = 1 } = paginationQuery;
    const start = (page - 1) * limit;
    const end = Number(start) + Number(limit);

    const data = users.slice(start, end);
    const total = users.length;
    const totalPages = Math.ceil(total / limit);

    if (!users) {
      throw new NotFoundException('Score not found');
    }

    return <PaginatorDto>{
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async downloadImage(userId: string, res: Response) {
    let user = await this.getUserByUserId(userId);
    let avatarImage = ''

    try {
      const filePath = join(__dirname, '../../../../../../dist/uploads', user.avatar);
      avatarImage = fs.readFileSync(filePath, {
        encoding: 'base64',
        flag: 'r',
      });
    } catch (error) {
      const filePath = join(__dirname, '../../../../../../assets/avatar.avif');
      avatarImage = fs.readFileSync(filePath, {
        encoding: 'base64',
        flag: 'r',
      });
    }
    return res.json({'avatarImage': avatarImage, ...user});
  }

  async updateUser(userId: string, updateUser: UpdateUserDto) {
    const roles = [];

    for (const [string, value] of Object.entries(updateUser?.roles)) {
      const role = await this.prismaService.role.findUnique({
        where: { name: value.toString() },
      });

      roles.push({ id: role?.id });
    }

    const user = await this.prismaService.user.update({
      where: { userId },
      data: {
        name: updateUser.name,
        username: updateUser.username,
        email: updateUser.email,
        roles: {
          connect: roles,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not updated');
    }

    return user;
  }

  async enableUser(userId: string) {
    const date = new Date();
    const user = await this.getUserByUserId(userId);
    const changeStatusUser = await this.prismaService.user.update({
      where: { userId: userId },
      data: {
        status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE',
        updatedAt: date.toISOString(),
      },
      select: {
        name: true,
        username: true,
        email: true,
        avatar: true,
        roles: true,
        status: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not updated');
    }

    return changeStatusUser;
  }

  async validateUser(email: string, password: string) {
    let userItem = await this.prismaService.user.findUnique({
      where: {
        email,
        OR: [
          { status: 'ACTIVE' },
          { status: 'BLOCKED' },
        ],
      },
      select: {
        email: true,
        password: true,
        userId: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!userItem) {
      throw new BadRequestException('Email not found');
    }

    let roles = [];
    for (const [key, value] of Object.entries(userItem?.roles)) {
      roles.push(value?.name);
    }

    userItem.roles = roles;
    const user = {
      email: userItem.email,
      roles: userItem.roles,
      sub: userItem.userId, //recent change
    };

    if (userItem && (await compare(password, userItem.password))) {
      return user;
    }
    return null;
  }

  async updateAvatarUser(userId: string, file: any, data: any) {
    try {
      const filePath = join(__dirname, '../../../../../../dist/uploads', data.data);
      fs.unlinkSync(filePath)
    } catch (error) {
      console.log(error)
    }

    const user = await this.prismaService.user.update({
      where: { userId },
      data: { avatar: file.filename },
    });

    if (!user) {
      throw new NotFoundException('User not updated');
    }

    return user;
  }

  async lockUser(userId: string) {
    const date = new Date();
    const user = await this.prismaService.user.update({
      where: { userId: userId },
      data: { updatedAt: date.toISOString(), status: 'INACTIVE' },
      select: {
        name: true,
        username: true,
        email: true,
        avatar: true,
        roles: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not updated');
    }

    return user;
  }

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

  // getUserById(id: string): User {
  //   return this.users.find((user) => user.id === id);
  // }

  // deleteUser(id: string): void {
  //   this.users = this.users.filter((user) => user.id !== id);
  // }

  // getScoresByUser(paginationQuery: PaginationQueryDto): PaginatorDto {
  //   const { limit = 10, page = 1 } = paginationQuery;
  //   const start = (page - 1) * limit;
  //   const end = start + limit;

  //   const data = this.scores.slice(start, end);
  //   const total = this.scores.length;
  //   const totalPages = Math.ceil(total / limit);

  //   return <PaginatorDto>{
  //     data,
  //     total,
  //     page,
  //     limit,
  //     totalPages,
  //   };
  // }
}
