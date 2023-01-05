"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
let { Client } = require('pg');
exports.client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "T1"
});
//# sourceMappingURL=database.js.map