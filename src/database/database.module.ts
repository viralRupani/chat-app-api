import { Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';
import { config } from './knexfile';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'KNEX',
            useFactory: (): Knex => {
                return knex(config['development']);
            },
        },
    ],
    exports: ['KNEX'],
})
export class DatabaseModule {}
