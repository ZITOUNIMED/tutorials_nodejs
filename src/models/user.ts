import { DataTypes } from 'sequelize';
import sequelize from '../util/database';

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

export default User;