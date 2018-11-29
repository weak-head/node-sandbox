const Sq = require('sequelize');
const db = require('../db');

const Product = db.define('Product', {
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

module.exports = Product;