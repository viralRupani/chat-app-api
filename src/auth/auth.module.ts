import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [UsersModule, JwtModule.register({
        global: true,
        secret: 'super-secret',
        signOptions: {
            expiresIn: '4h',
        }
    })],
    providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
