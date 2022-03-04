'use strict';

const debug = require('debug')('contact:api:config');

module.exports = {
    db: {
        database: process.env.DB_NAME || 'contact',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: s => debug(s),
    }
}