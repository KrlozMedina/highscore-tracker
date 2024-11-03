import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({summary: 'Get all users for a score'})
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':userId')
    @ApiOperation({summary: 'get Score by Id'})
    @ApiResponse({status: 200, description: 'User by Id'})
    async getUserByUserId(@Param('userId') userId: string) {
        return this.usersService.getUserByUserId(userId);
    }

    @Post()
    @ApiOperation({summary: 'Create User'})
    @ApiResponse({status: 201, description: 'Create User'})
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // @Get('/admin')
    // getAllUsers(@Query() paginationQuery: PaginationQueryDto) {
    //     return this.usersService.getAllUsers(paginationQuery);
    // }

    @Get('/scores/:id')
    getScoresByUserID(@Query() paginationQuery: PaginationQueryDto) {
        return this.usersService.getScoresByUser(paginationQuery);
    }

    // @Get(':id')
    // getUserById(@Param('id') id: string): User | undefined {
    //     return this.usersService.getUserById(id);
    // }

    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto): User {
    //     return this.usersService.createUser(createUserDto);
    // }

    // @Put(':id')
    // updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
    //     return this.usersService.updateUser(id, updateUserDto);
    // }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string): void {
        this.usersService.deleteUser(id)
    }
}

@Controller('users/profile')
export class ProfileController {
    constructor(private readonly userService: UsersService) {}

    // @Get(':userId')
    // getUserById(@Param('userId') id: string): User | undefined {
    //     return this.userService.getUserById(id);
    // }

    // @Put(':userId')
    // updateUser(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto): User {
    //     return this.userService.updateUser(id, updateUserDto);
    // }
}