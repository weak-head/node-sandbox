const express = require('express');
const nopage = express.Router();

nopage.use((req, res, next) => {
    res.status(404).send('<h1>Not found</h1>');
});

module.exports = nopage;