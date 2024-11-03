import { Module } from '@nestjs/common';
import { UsersController, ProfileController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [UsersController, ProfileController],
  providers: [UsersService, PrismaService]
})
export class UsersModule {}
