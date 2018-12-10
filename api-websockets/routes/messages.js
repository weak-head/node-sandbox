const express = require('express');
const router  = express.Router();

const io = require('../socket');

const messages = [];

router.get('/', (req, res, next) => {
    res.json(messages);
});

router.post('/create', (req, res, next) => {
    const title = req.body.title;
    const body  = req.body.body;

    const message = {
        title: title,
        body:  body
    };

    messages.push(message);

    // broadcast the event to all clients
    io.getIO().emit('messages', {
        action: 'create',
        message: message
    });

    res.status(201).json('OK');
});

module.exports = {
    router: router,
    messages: messages
};