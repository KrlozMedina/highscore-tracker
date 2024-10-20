import { Injectable } from '@nestjs/common';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
    private auth: Auth[] = []

    constructor() {}

    getAllAth() : Auth[] {
        return this.auth;
    }
}
