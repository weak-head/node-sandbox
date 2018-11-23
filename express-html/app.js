const express = require('express');
const app = express();

const messageRoutes = require('./routes/message');

app.use(express.urlencoded({extended: false}))
app.use('/message', messageRoutes);

app.get('/', (req, res, next) => {
    res.redirect('/message');
});

app.use((req, res, next) => {
    res.send('<h1>Not found :(</h1>')
});

app.listen(3000);