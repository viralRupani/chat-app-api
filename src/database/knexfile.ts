import type { Knex } from "knex";
require('dotenv').config();

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    },
    migrations: {
      tableName: 'migrations',
    },
    debug: true,
  },
};

exports = config;
