const path = require('path');

const express = require('express');
const app = express();

const messageRoutes = require('./routes/message');

// decoding request body
app.use(express.urlencoded({extended: false}));

// static hosting of the files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// serving pug templates from the 'views' folder
app.set('view engine', 'pug');
app.set('views', 'views');

// message routing
app.use('/message', messageRoutes);

// default redirect to the '/message' route
app.use('/', (req, res, next) => {
    res.redirect('/message');
});

app.listen(4000);