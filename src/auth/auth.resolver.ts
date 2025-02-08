import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserDto } from './dtos/register-user.dto';
import { randomBytes } from 'node:crypto';
import { hashPassword } from 'src/common/lib/cryptography';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';
import { generateOtp } from 'src/common/lib/otp-manager';
import { LoginUserDto } from './dtos/login-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { USER_NOT_FOUND, WRONG_CREDENTIALS } from 'src/common/constants';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dtos/login-response.output';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
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

    @Query(() => LoginResponse)
    async login(@Args('object') dto: LoginUserDto): Promise<LoginResponse> {
        const userDetails: UsersEntity = await this.usersService.findUserByUsername(dto.username)
        if (!userDetails) {
            throw new NotFoundException(USER_NOT_FOUND);
        }
        const hash = await hashPassword(dto.password, userDetails.salt);
        if (hash !== userDetails.password) {
            throw new UnauthorizedException(WRONG_CREDENTIALS);
        }
        const jwtPayload = { sub: userDetails.id, username: userDetails.username }
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(jwtPayload),
            this.jwtService.signAsync({ ...jwtPayload, type: 'refresh' }, { expiresIn: '8h' })
        ])
        return {
            access_token,
            refresh_token,
            user: userDetails,
        }
    }
}
