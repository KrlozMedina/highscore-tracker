import { Controller, Post, Body, HttpStatus, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

export interface User {
  email: string;
  password: string;
  id: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  // @Get('token-validate')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Validar token' })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'Validar token de usuario',
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   description: 'data equivocada',
  // })
  // validateToken(@Req() req: Request) {
  //   const [type, token] = req.headers?.authorization?.split(' ') ?? [];
  //   return this.authService.validateToken(token);
  // }

  @Post('login')
  @ApiOperation({ summary: 'Login user', description: 'Auth user with username, and password', operationId: 'login' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Login successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create user', description: 'Auth user with email or username, and password' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User register successful' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User bad request' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User Conflict' })
  register(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar token' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Eliminar token de usuario' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Data equivocada' })
  logout(@Req() req: Request) {
    const token = req.headers?.authorization;
    return this.authService.logout(token);
  }
}
