'use strict';

const setupDatabase = require('./lib/db');
const setupMessageModel = require('./models/message');
const setupMessage = require('./lib/message');
const defaults = require('defaults');

module.exports = async function (config) {
    config = defaults(config, {
        dialect: 'sqlite',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        query: {
            raw: true
        }
    });

    const sequelize = setupDatabase(config)
    const MessageModel = setupMessageModel(config);

    await sequelize.authenticate();

    if (config.setup) {
        await sequelize.sync({ force: true });
    }

    const Message = setupMessage(MessageModel);

    return {
        Message
    };
}