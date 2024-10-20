import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Get()
    getAllAuth() : Auth[] {
        return this.authService.getAllAth();
    }
}
