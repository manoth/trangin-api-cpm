"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const path = require("path");
const fs = require('fs');
const pathFile = path.join(__dirname, '../../config.json');
class Connection {
    constructor() {
        this.config = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
    }
    db() {
        let connection = this.config.connection;
        let client = this.config.client;
        return Knex({
            client: client,
            connection: connection,
            pool: {
                min: 0,
                max: 7,
                afterCreate: (conn, done) => {
                    conn.query('SET NAMES utf8', (err) => {
                        done(err, conn);
                    });
                }
            },
            debug: true,
            acquireConnectionTimeout: 10000
        });
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map