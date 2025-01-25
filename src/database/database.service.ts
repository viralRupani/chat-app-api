import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    /* Postgres connection on module init */
    private async onModuleInit() {
        this.pool = new Pool({
            host: 'localhost',
            port: 5432,
            database: 'chat_db',
            user: 'root',
            password: 'super_secret',
            max: 5,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        try {
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
    private async onModuleDestroy() {
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
