import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DataSource } from 'typeorm';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersEntity } from 'src/users/entities/user.entity';
import { hashPassword } from 'src/common/lib/cryptography';
import { USER_NOT_FOUND, WRONG_CREDENTIALS } from 'src/common/constants';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dtos/login-response.output';

@Injectable()
export class AuthService {
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(dto: LoginUserDto): Promise<any> {
        const userDetails: UsersEntity = await this.usersService.findUserByUsername(dto.username)
        if (!userDetails) {
            return null;
        }
        const hash = await hashPassword(dto.password, userDetails.salt);
        if (hash !== userDetails.password) {
            return null;
        }
        const { password, ...rest } = userDetails;
        return rest;
    }

    async login(user: any): Promise<LoginResponse> {
        return {
            access_token: await this.jwtService.signAsync({ sub: user.id, username: user.username }),
            refresh_token: await this.jwtService.signAsync({ sub: user.id, username: user.username }),
            user: user
        }
    }
}
