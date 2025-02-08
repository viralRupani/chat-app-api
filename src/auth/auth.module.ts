import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [UsersModule, JwtModule.register({
        global: true,
        secret: 'super-secret',
        signOptions: {
            expiresIn: '4h',
        }
    })],
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}
