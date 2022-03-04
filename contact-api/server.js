'use strict';

const debug = require('debug')('contact:api');
const http = require('http');
const chalk = require('chalk');
const express = require('express');
const asyncify = require('express-asyncify');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('contact-db')

let services, Message
const config = require("./config");
const {MessageSchema} = require("./schemas");

const port = process.env.PORT || 3000;
const app = asyncify(express());
const server = http.createServer(app);
const socketio = require('socket.io')

const io = socketio(server, {
    cors: {
        origin: '*',
        methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    }
});

app.use(cors())
app.use(bodyParser.json());


io.on('connect', socket => {
    debug(`Connected socket: ${socket.id}`);
})

app.use('*', async (req, res, next) => {
    if (!services) {
        debug('Connecting to database')
        try {
            services = await db(config.db)
        } catch (e) {
            return next(e)
        }

        Message = services.Message
    }
    next()
})

app.get('/messages', async (req, res, next) => {
    let messages = []
    try {
        messages = await Message.findAll()
    } catch (e) {
        return next(e)
    }

    res.json({
        status: 'success',
        data: messages
    })
})

app.post('/messages', async (req, res, next) => {
    let message = req.body
    debug(message)
    let values;
    try {
        values = await MessageSchema.validateAsync(message)
    } catch (e) {
        return res.json({
            status: 'error',
            error: e
        })
    }

    try {
        message = await Message.create(values)
        io.emit('new-message', message)
    } catch (e) {
        return next(e)
    }
    res.json(message)
})

app.get('/messages/:id', async (req, res, next) => {
    let message
    const {id} = req.params
    try {
        message = await Message.findOne(id)
        if (!message) {
            throw new Error('Message not found')
        }
    } catch (e) {
        return next(e)
    }

    res.json({
        status: 'success',
        data: message
    })
})

app.use((err, req, res, next) => {
    debug(`Error: ${err.message}`);

    if (err.message.match(/not found/)) {
        return res.status(404).send({
            status: 'error',
            error: err.message
        });
    }
    res.status(500).send({
        status: 'error',
        error: err.message
    });
})

function handleFatalError(err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
    console.log(`${chalk.green('[contact-api]')} server listening on port ${port}`)
})