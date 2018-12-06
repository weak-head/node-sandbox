const express = require('express');
const app     = express();

const commentRouter = require('./routes/comment');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/comments', commentRouter);

app.use((req, res, next) => {
    res.status(404).send('Not found');
});

app.listen(8080);