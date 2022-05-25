import { DataTypes } from 'sequelize';
import sequelize from '../util/database';

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    price: DataTypes.DOUBLE,
    amount: DataTypes.INTEGER,
});

export default Product;