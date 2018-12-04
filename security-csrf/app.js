const path = require('path');

const express = require('express');
const app     = express();

const session = require('express-session');
const csrf    = require('csurf');

// using ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// hosting public folder
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// using session and csrf protection
app.use(session({ secret: 'secret string'
                , resave: false
                , saveUninitialized: false
                }));
app.use(csrf());


// middleware to generate csrf token for each new request
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken       = req.csrfToken();
    next();
});

// UI message handler
app.get('/message', (req, res, next) => {
    res.render('message', {
        pageTitle: "Send message",
        isAuthenticated: res.locals.isAuthenticated,
        csrfToken: res.locals.csrfToken
    });
});

// protected against CSRF
app.post('/api/message', (req, res, next) => {
    const title = req.body.title;
    const body  = req.body.body;

    console.log(`${title} - ${body}`);

    res.redirect('/message');
});

app.get('/', (req, res, next) => {
    res.redirect('/message')
});

// final terminator that results in 404
app.use((req, res, next) => {
    res.status(404)
       .render('404', {
           pageTitle: 'Page Not Found',
           isAuthenticated: res.locals.isAuthenticated
       });
});

app.listen(3000);