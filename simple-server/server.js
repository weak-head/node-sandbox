/*
    Dirty funky native http server ^_^
*/

const http = require('http');

const log = (name, data) => {
    console.log(`--- ${name} START ---`);
    console.log(data);
    console.log(`--- ${name} END -----\n`);
}

// path: /
const rootHandler = (req, res) => {
    res.write('<html>');
    res.write('<head><title>Put your dirty message here:</title></head>');
    res.write('<body>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}

// path: /message
const messageHandler = (req, res) => {

}

const PATH    = 0;
const HANDLER = 1;
const pathMap = [
    ['/', rootHandler],
    ['/message', messageHandler]
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
        if (pathRoute[PATH] === req.url) {
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