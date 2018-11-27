const express = require('express');
const messageRoutes = express.Router();

messageRoutes.get('/', (req, res, next) => {
    res.render('message',
        { docTitle: 'Input your message'
        , msgSubmitBtn: 'Send message'
        , msgSubmitTitle: 'Message:' });
});

messageRoutes.post('/', (req, res, next) => {
    console.log(req.body);
    res.redirect('/message');
});

module.exports = messageRoutes;