const Sq = require('sequelize');
const db = require('../db');

const User = require('./user');
const Cart = require('./cart');
const CartItem = require('./cart-item');

const Product = db.define('product', {
    id: {
        type: Sq.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sq.STRING,
        allowNull: false
    },
    price: {
        type: Sq.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sq.STRING,
        allowNull: false
    },
    description: {
        type: Sq.STRING,
        allowNull: false
    }
});

Product.belongsTo(User, { constraints: false, onDelete: 'CASCADE'});
Product.belongsToMany(Cart, { through: CartItem });

module.exports = Product;