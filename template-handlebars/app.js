const path = require('path');
const express = require('express');
const app = express();

const expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout.hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/message', (req, res, next) => {
    res.render('message',
        { pageTitle: "Input your message"
        , lbMessage: "Message:"
        , btnSend: "Send message" })
});

app.post('/message', (req, res, next) => {
    console.log(req.body);
    res.redirect('/message');
});

app.get('/', (req, res, next) => {
    res.redirect('/message');
});

app.listen(4000);