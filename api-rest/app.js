const express = require('express');
const app     = express();

const messageRoutes = require('./routes/message');

app.use(express.json());

app.use('/messages', messageRoutes);

app.listen(8080);