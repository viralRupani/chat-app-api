import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE TABLE users (
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username VARCHAR(30) NOT NULL,
            phone_number INT NOT NULL,
            password VARCHAR(500) UNIQUE NOT NULL,
            profile_url VARCHAR(300) UNIQUE,
            bio VARCHAR(500),
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp,
            deleted_at timestamp
        )
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw('DROP TABLE USERS')
}

