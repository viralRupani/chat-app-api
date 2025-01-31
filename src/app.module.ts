import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphqlConfig } from './config/graphql.config';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/data-source';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GraphqlConfig,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: ['.env', '.env.development'],
            load: [configuration],
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        UsersModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
