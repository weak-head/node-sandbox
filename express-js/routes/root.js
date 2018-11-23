const express = require('express');
const rootRoutes = express.Router();

rootRoutes.get('/', (req, res, next) => {
    res.redirect('/message');
});

module.exports = rootRoutes;