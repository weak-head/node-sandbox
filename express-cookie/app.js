const express = require('express');
const app     = express();

app.use(express.json());

app.post('/api/login', (req, res, next) => {
    console.log(req.body);

    const login    = req.body.login;
    const password = req.body.password;

    if (login == 'admin' && password == 'pwd') {
        // who needs JWT ^_^ ?
        // security? never heard of it...
        res.setHeader('Set-Cookie', 'Authenticated=True; Expires=Wed, 13 Jan 2029 20:20:01 GMT; HttpOnly;');
        res.setHeader('Set-Cookie', 'Role=Admin');
        res.status(200).send('OK');
    } else {
        res.status(422).send('Invalid credentials');
    }
});

app.listen(3000);