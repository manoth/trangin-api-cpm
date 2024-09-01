import { knex } from 'knex';

export class Connection {
    mysql() {
        return knex({
            client: process.env.DB_TYPE,
            connection: {
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                charset: process.env.DB_CHARSET,
                timezone: process.env.DB_TIMEZONE
            },
            pool: {
                min: 0,
                max: 7,
                afterCreate: (conn, done) => {
                    conn.query('SET NAMES utf8', (err) => {
                        done(err, conn);
                    });
                }
            },
            debug: false,
            acquireConnectionTimeout: 10000
        });
    }
}