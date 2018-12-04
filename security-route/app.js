const express = require('express');
const app     = express();
const session = require('express-session');

app.use(express.json());
app.use(session({ secret: 'darksouls'
                , resave: false
                , saveUninitialized: false
                }));

// auth guard
const requireAuth = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.status(401).send('Unauthorized');
    } else {
        next();
    }
}

app.post('/api/login', (req, res, next) => {
    const login = req.body.login;
    const pass  = req.body.password;

    if (login === 'admin' && pass === 'pwd') {
        req.session.isAuthenticated = true;
        res.send('OK');
    } else {
        res.status(422).send('Invalid credentials');
    }
});

app.post('/api/logout', (req, res, next) => {
    req.session.destroy(err => {
        req.session = null;
        if (err) {
            console.log(err);
            next(err);
        }
        res.send('OK');
    });
})

// simple chain of responsibility
app.get('/api/resource1', requireAuth, (req, res, next) => {
    res.send('resource #1');
});

app.get('/api/resource2', requireAuth, (req, res, next) => {
    res.send('resource #2');
});

app.listen(3000);