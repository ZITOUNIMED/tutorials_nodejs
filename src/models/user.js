const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    login: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role: DataTypes.STRING,
});

module.exports = User;