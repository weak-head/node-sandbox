/*
    Dirty funky native http server ^_^
*/

const http = require('http');
const fs   = require('fs');

const log = (name, data) => {
    console.log(`--- ${name} START ---`);
    console.log(data);
    console.log(`--- ${name} END -----\n`);
}

// request: GET /
const rootHandler = (req, res) => {
    res.write('<html>');
    res.write('<head><title>Put your dirty message here:</title></head>');
    res.write('<body>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}

// request: POST /message
const messageHandler = (req, res) => {
    fs.writeFileSync('message.txt', '<>');

    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
}

const PATH    = 0;
const METHOD  = 1;
const HANDLER = 2;
const pathMap = [
    ['/', 'GET', rootHandler],
    ['/message', 'POST', messageHandler]
]

const httpServer = http.createServer((req, res) => {
    const fields = [
        ['Url', req.url],
        ['Method', req.method],
        ['Headers', req.headers],
        ['Raw Headers', req.rawHeaders],
    ];

    for (let field of fields)
        log(...field);

    let handledBy = null;
    for (let pathRoute of pathMap)
        if (pathRoute[PATH] === req.url &&
            pathRoute[METHOD] === req.method) {
                pathRoute[HANDLER](req, res);
                handledBy = pathRoute;
                res.end();
                break;
        }

    if (!handledBy) {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>O_o</title></head>');
        res.write('<body><h1>This way of writing HTML is super ugly... You should try something else.</h1></body>');
        res.write('</html>');
        res.end();
    }
});

httpServer.listen(4000);