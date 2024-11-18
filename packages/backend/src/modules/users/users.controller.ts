import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get(':userId')
  // @ApiOperation({ summary: 'get Score by Id' })
  // @ApiResponse({ status: 200, description: 'User by Id' })
  // async getUserByUserId(@Param('userId') userId: string) {
  //   return this.usersService.getUserByUserId(userId);
  // }

  // @Get(':userId/download-image')
  // @ApiOperation({ summary: 'Descargar imagen y data de un jugador' })
  // @ApiResponse({ status: HttpStatus.OK, description: 'Descarga en detalle con la imagen del jugador' })
  // downloadImage(@Param('userId') userId: string, @Res() res: Response) {
  //   return this.usersService.downloadImage(userId, res)
  // }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users', description: 'Get all users by admin'})
  @ApiResponse({ status: HttpStatus.OK, description: 'All users uploaded successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Valid token, no permission for this action' })
  async getAllUsers(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationQuery);
  }

  @Get('profile/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PLAYER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile', description: 'Get detail of user profile by ID', operationId: 'profile' })
  @ApiResponse({ status: 200, description: 'User data uploaded successfully' })
  @ApiResponse({ status: 400, description: 'User bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfileById(@Param('userId') userId: string, @Res() res: Response) {
    return this.usersService.downloadImage(userId, res);
  }

  @Put('profile/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PLAYER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile user', description: 'Update profile user by ID' })
  @ApiResponse({ status: 200, description: 'User data updated successfully' } )
  @ApiResponse({ status: 400, description: 'User bad request' } )
  @ApiResponse({ status: 401, description: 'Unauthorized'} )
  @ApiResponse({ status: HttpStatus.OK, description: 'El jugador ha sido actualizado'} ) 
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuario no encontrado' })
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Put('profile/:userId/updateAvatar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PLAYER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update avatar user', description: 'Update avatar user by ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'User data updated successfully'} ) 
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User bad request' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fileSize: 1024 * 1024 * 2 },  //2MB
    }),
  )
  async updateAvatar(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request
  ) {
    // console.log(request.body)
    return this.usersService.updateAvatarUser(userId, file, request.body);
  }

  @Patch('admin/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Enable or block user',
    description: 'Enable or block user by admin',
  })
  @ApiResponse({ status: 200, description: 'User enabled or block successful' })
  @ApiResponse({ status: 400, description: 'User bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Valid token, no permission for this action',
  })
  async enableUser(@Param('userId') userId: string) {
    return this.usersService.enableUser(userId);
  }
  
  @Delete('admin/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user', description: 'Delete user by admin' })
  @ApiResponse({ status: 200, description: 'User removed successfully' })
  @ApiResponse({ status: 400, description: 'User bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Valid token, no permission for this action' })
  async lockUser(@Param('userId') userId: string) {
    return this.usersService.lockUser(userId);
  }

  // @Delete(':id')
  // @HttpCode(204)
  // deleteUser(@Param('id') id: string): void {
  //   this.usersService.deleteUser(id);
  // }
}

// @Controller('users/profile')
// export class ProfileController {
//   constructor(private readonly userService: UsersService) {}

//   // @Get(':userId')
//   // getUserById(@Param('userId') id: string): User | undefined {
//   //     return this.userService.getUserById(id);
//   // }

//   // @Put(':userId')
//   // updateUser(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto): User {
//   //     return this.userService.updateUser(id, updateUserDto);
//   // }
// }
