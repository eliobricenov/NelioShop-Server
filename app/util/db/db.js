const pgp = require('pg-promise')();

const config = {
    host: 'localhost',
    port: 5432,
    database: 'neliokeep',
    user: 'postgres',
    password: '1234'
};
const db = pgp(config);

module.exports = db;


