const express = require('express');
const path    = require('path');
const io      = require('./socket'); //require('socket.io');

const messageRouter = require('./routes/messages');

const app     = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// rest api endpoint handler
app.use('/messages', messageRouter.router);

const server   = app.listen(8080);
const ioserver = io.init(server);

// WebSocket client messages
ioserver.on('connection', socket => {
    console.log('connected');
});