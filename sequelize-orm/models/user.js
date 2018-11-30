const Sq = require('sequelize');
const db = require('../db');

const Product = require('./product');
const Cart    = require('./cart');

const User = db.define('user', {
    id: {
        type: Sq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sq.STRING,
    email: Sq.STRING
});

User.hasOne(Cart);

module.exports = User;