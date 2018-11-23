const express = require('express');
const logger = express.Router();

logger.use((req, res, next) => {
    console.log('--- REQUEST ---');
    console.log(req.method + ' ' + req.url);
    console.log(req.body);
    console.log('----------------\n');
    next();
});

module.exports = logger;