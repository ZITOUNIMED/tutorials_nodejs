const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    price: DataTypes.DOUBLE,
    amount: DataTypes.INTEGER,
});

module.exports = Product;