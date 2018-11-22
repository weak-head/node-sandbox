const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log('--- REQUEST ---');
    console.log(req.method + ' ' + req.url);
    console.log(req.body);
    console.log('----------------\n');
    next();
})

app.get('/message', (req, res, next) => {
    res.send('<form action="/message" method="POST"> \
                <input type="text" name="msg"> \
                <button type="submit">Send</button> \
              </form>');
});

app.post('/message', (req, res, next) => {
    console.log('-> ' + JSON.stringify(req.body) + ' <-\n');
    res.redirect('/message');
});

app.use('/', (req, res, next) => {
    res.send('Root');
});

app.listen(4000);