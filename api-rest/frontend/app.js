const express = require('express');
const app     = express();
const path    = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.redirect('/index.html');
});

app.listen(80);