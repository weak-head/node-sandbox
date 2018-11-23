const express = require('express');
const path = require('path');
const messageRoutes = express.Router();

messageRoutes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'message.html'));
});

messageRoutes.post('/', (req, res, next) => {
    console.log('-> ' + JSON.stringify(req.body) + ' <-');
    res.redirect('/');
});

module.exports = messageRoutes;