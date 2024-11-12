import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class AuthService {
  private redisClient;

  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.redisClient = createClient({
      url: `redis://${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`,
    });

    this.redisClient.connect();
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.userService.validateUser(email, password);

  //   return user;

  //   // if (user) {
  //   //   return user;
  //   // }
  //   // return null;
  // }

  async login(user: LoginUserDto): Promise<object> {
    const userAuth = await this.userService.validateUser(user.email, user.password);

    if (!userAuth) {
      throw new BadRequestException('Password does not match');
    }

    const token = this.jwtService.sign({ ...userAuth });

    await this.redisClient.set(token, 'active', {
      EX: this.configService.get('JWT_EXPIRES_IN'),
    });

    return {
      token: token,
    };
  }

  async logout(token: string) {
    await this.redisClient.del(token);
  }

  async validateToken(token: string): Promise<boolean> {
    const result = await this.redisClient.get(token);
    return result === 'active';
  }
}
