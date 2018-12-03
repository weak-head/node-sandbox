const express = require('express');
const app     = express();

const session = require('express-session');

app.use(express.json());
app.use(session({ secret: 'some secure value'
                , resave: false
                , saveUninitialized: false}))

app.post('/api/login', (req, res, next) => {
    const login    = req.body.login;
    const password = req.body.password;

    if (login == 'admin' && password == 'pwd') {
        req.session.isAuthenticated = true;
        res.status(200).send('OK');
    } else {
        res.status(422).send('Invalid credentials');
    }
});

app.get('/api/resource', (req, res, next) => {
    console.log(req.session);

    if (req.session.isAuthenticated) {
        res.send('OK');
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(3000);