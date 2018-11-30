const Sq = require('sequelize');
const db = require('../db');

const CartItem = db.define('cartItem', {
    id: {
        type: Sq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sq.INTEGER
});

module.exports = CartItem;