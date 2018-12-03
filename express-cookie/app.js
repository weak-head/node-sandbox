const express = require('express');
const app     = express();

app.use(express.json());

app.post('/api/v1/login', (req, res, next) => {
    console.log(req.body);

    const login    = req.body.login;
    const password = req.body.password;

    if (login == 'admin' && password == 'pwd') {
        // who needs JWT and some third-party libraries ^_^ ?
        // security? never heard of it...
        res.setHeader('Set-Cookie', 'Authenticated=True');
        res.status(200).send('OK');
    } else {
        res.status(422).send('Invalid credentials');
    }
});

app.get('/api/v1/resource', (req, res, next) => {
    const cookie = req.get('Cookie');
    console.log(cookie);

    // You should never write the code like this.
    // It's only for demonstration purposes and still hurts my eyes.
    const isAuth = cookie == undefined ? false : cookie.split('=')[1];

    if (isAuth) {
        res.status(200).send('OK');
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(3000);