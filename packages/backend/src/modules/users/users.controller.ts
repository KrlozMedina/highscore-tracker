import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('profile/:userId')
    @ApiOperation({summary: 'Get user profile', description: 'Get detail of user profile by ID', operationId: 'profile'})
    @ApiResponse({status: 200, description: 'User data uploaded successfully'})
    @ApiResponse({status: 400, description: 'User bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async getProfileById(@Param('userId') userId: string) {
        return this.usersService.getUserByUserId(userId);
    }

    @Put('profile/:userId')
    @ApiOperation({summary: 'Update profile user', description: 'Update profile user by ID'})
    @ApiResponse({status: 200, description: 'User data updated successfully'})
    @ApiResponse({status: 400, description: 'User bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async updateProfile(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(userId, updateUserDto);
    }

    @Get('admin')
    @ApiOperation({summary: 'Get all users', description: 'Get all users by admin'})
    @ApiResponse({status: 200, description: 'All users uploaded successfully'})
    @ApiResponse({status: 400, description: 'User bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Valid token, no permission for this action'})
    async getAllUsers(@Query() paginationQuery: PaginationQueryDto) {
        return this.usersService.getAllUsers(paginationQuery);
    }

    @Patch('admin/:userId')
    @ApiOperation({summary: 'Enable or block user', description: 'Enable or block user by admin'})
    @ApiResponse({status: 200, description: 'User enabled or block successful'})
    @ApiResponse({status: 400, description: 'User bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Valid token, no permission for this action'})
    async enableUser(@Param('userId') userId: string) {
        return this.usersService.enableUser(userId);
    }

    @Delete('admin/:userId')
    @ApiOperation({summary: 'Delete user', description: 'Delete user by admin'})
    @ApiResponse({status: 200, description: 'User removed successfully'})
    @ApiResponse({status: 400, description: 'User bad request'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Valid token, no permission for this action'})
    async lockUser(@Param('userId') userId: string) {
        return this.usersService.lockUser(userId);
    }

    @Get(':userId')
    @ApiOperation({summary: 'get Score by Id'})
    @ApiResponse({status: 200, description: 'User by Id'})
    async getUserByUserId(@Param('userId') userId: string) {
        return this.usersService.getUserByUserId(userId);
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

    // @Get(':userId')
    // getUserById(@Param('userId') id: string): User | undefined {
    //     return this.userService.getUserById(id);
    // }

    // @Put(':userId')
    // updateUser(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto): User {
    //     return this.userService.updateUser(id, updateUserDto);
    // }
}