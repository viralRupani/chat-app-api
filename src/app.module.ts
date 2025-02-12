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
import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';

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
        UsersModule,
        AuthModule,
        DatabaseModule,
        ChatModule,
        MessagesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
