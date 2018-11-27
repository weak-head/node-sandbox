const express = require('express');
const messageRoutes = express.Router();

messageRoutes.get('/', (req, res, next) => {
    res.send('OK');
});

messageRoutes.post('/', (req, res, next) => {
    res.send('OK');
});

module.exports = messageRoutes;