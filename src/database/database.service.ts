import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;

    constructor(private readonly configService: ConfigService) { }

    /* Postgres connection on module init */
    async onModuleInit() {
        try {
            this.pool = new Pool(this.configService.get('database'));
            const client = await this.pool.connect();
            client.release();
            console.log('Database connected');
        } catch (err) {
            console.error('Failed to connect to the database', err);
            throw err;
        } finally {
        }

    }

    /* End the connection on unmount of this module */
    async onModuleDestroy() {
        await this.pool.end();
    }

    /**
     * @name query
     * @param queryText SQL query
     * @param params Query variable values
     * @returns result
     */
    async query(queryText: string, params: any[] = []) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(queryText, params);
            return result;
        } finally {
            client.release();
        }
    }
}
