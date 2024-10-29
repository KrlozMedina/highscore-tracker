import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('users/admin')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers(@Query() paginationQuery: PaginationQueryDto) {
        return this.usersService.getAllUsers(paginationQuery);
    }

    @Get(':id')
    getUserById(@Param('id') id: string): User | undefined {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): User {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string): void {
        this.usersService.deleteUser(id)
    }
}

@Controller('users/profile')
export class ProfileController {
    constructor(private readonly userService: UsersService) {}

    @Get(':userId')
    getUserById(@Param('userId') id: string): User | undefined {
        return this.userService.getUserById(id);
    }

    @Put(':userId')
    updateUser(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto): User {
        return this.userService.updateUser(id, updateUserDto);
    }
}