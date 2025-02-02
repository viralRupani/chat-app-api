export default () => ({
    app: {
        port: process.env.PORT,
    },
    database: {
        client: process.env.DATABASE_CLIENT,
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT!,
        database: process.env.DATABASE,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        max: +process.env.DATABASE_MAX_CONNECTION!,
        idleTimeoutMillis: +process.env.IDLE_TIMEOUT_MILLI!,
        connectionTimeoutMillis: +process.env.CONNECTION_TIMEOUT_MILL!,
    },
});
