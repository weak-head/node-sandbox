const express = require('express');

const app = express();

const loggerMiddleware = require('./middlewares/logger');
const nopageMiddleware = require('./middlewares/nopage');

const messageRoutes = require('./routes/message');
const rootRoutes = require('./routes/root');

app.use(express.urlencoded({extended: false}));
app.use(loggerMiddleware);

app.use('/message', messageRoutes);
app.use(rootRoutes);

app.use(nopageMiddleware);

app.listen(4000);