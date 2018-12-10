const express = require('express');
const path    = require('path');
const io      = require('./socket'); //require('socket.io');

const app     = express();

app.use(express.static(path.join(__dirname, 'frontend')));



const server   = app.listen(8080);
const ioserver = io.init(server);

ioserver.on('connection', socket => {
    console.log('connected');
});