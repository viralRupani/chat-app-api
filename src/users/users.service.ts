import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dtos/register-user.dto';
import { DataSource } from 'typeorm';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private readonly dataSource: DataSource) { }

    async createUser(
        dto: RegisterUserDto,
        salt: string,
    ): Promise<UsersEntity[]> {
        return this.dataSource.query(
            `
            INSERT INTO users (
                first_name,
                last_name,
                phone_number,
                email,
                username,
                password,
                salt,
                profile_url
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            )
            RETURNING
                id, first_name, last_name, phone_number, email, username, profile_url
            `,
            [
                dto.first_name,
                dto.last_name,
                dto.phone_number,
                dto.email,
                dto.username,
                dto.password,
                salt,
                dto?.profile_url,
            ],
        );
    }

    async findUserByUsername(username: string) {
        const foundUser = await this.dataSource.query(`
                SELECT
                    id,
                    password,
                    salt,
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    username,
                    profile_url,
                    bio
                FROM
                    users
                WHERE
                    username = $1
                AND
                    is_verified = $2
                AND
                    deleted_at IS NULL
            `, [username, true])
        return foundUser[0];
    }
}
