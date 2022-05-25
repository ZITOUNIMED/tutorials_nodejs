import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('nodejs_database', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;