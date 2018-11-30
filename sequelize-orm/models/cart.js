const Sq = require('sequelize');
const db = require('../db');

const User = require('./user');
const Product = require('./product');
const CartItem = require('./cart-item');

const Cart = db.define('cart', {
    id: {
        type: Sq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Cart;