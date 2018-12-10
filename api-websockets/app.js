const express = require('express');
const path    = require('path');
const io      = require('./socket'); //require('socket.io');

const messageRouter = require('./routes/messages');

const app     = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// rest api endpoint for some third party clients
app.use('/messages', messageRouter.router);

const server   = app.listen(8080);
const ioserver = io.init(server);

// WebSocket handler for all client messages.
// Executed on each new client connection.
ioserver.on('connection', socket => {
    console.log('new client is connected');

    // Handles message from the client
    socket.on('messages', data => {
        if (data.action == 'create') {
            messageRouter.messages.push(data.message);

            // broadcast the event to all clients
            io.getIO().emit('messages', {
                action: 'create',
                message: data.message
            });
        }
    })
});