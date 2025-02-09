import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserDto } from './dtos/register-user.dto';
import { randomBytes } from 'node:crypto';
import { hashPassword } from 'src/common/lib/cryptography';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { generateOtp } from 'src/common/lib/otp-manager';
import { LoginUserDto } from './dtos/login-user.dto';
import {  UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/login-response.output';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly usersService: UsersService,
        private authService: AuthService,
    ) { }

    @Mutation(() => UsersEntity)
    async registerUser(@Args('object') dto: RegisterUserDto) {
        const salt = randomBytes(16).toString('hex');
        dto.password = await hashPassword(dto.password, salt);

        const [createdUser, otp] = await Promise.all([
            await this.usersService.createUser(
                dto,
                salt
            ),
            generateOtp(dto.username, salt)
        ]);

        return createdUser[0];
    }

    @UseGuards(LocalAuthGuard)
    @Query(() => LoginResponse)
    async login(
        @Args('object') dto: LoginUserDto,
        @CurrentUser() user: any
    ) {
        return this.authService.login(user);
    }
}
