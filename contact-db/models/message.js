'use strict';

const Sequelize = require('sequelize');
const setupDatabase = require('../lib/db');

module.exports = function setupMessageModel(config) {
    const sequelize = setupDatabase(config);

    return sequelize.define('message', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
}