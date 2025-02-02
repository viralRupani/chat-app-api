import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterUserDto } from './dtos/register-user.dto';
import { randomBytes } from 'node:crypto';
import { hashPassword } from 'src/common/lib/cryptography';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => UsersEntity)
    async registerUser(@Args('object') dto: RegisterUserDto) {
        /* cryptography */
        const salt = randomBytes(16).toString('hex');
        dto.password = (await hashPassword(dto.password, salt)) + salt;

        const createdUser: UsersEntity[] = await this.usersService.createUser(
            dto,
            salt,
        );

        return createdUser[0];
    }
}
