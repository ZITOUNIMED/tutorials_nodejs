import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { Sequelize } from 'sequelize';

import configuration from './config/config.json';

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = (configuration as {[key: string]: any})[env];

const db: {
  [key: string]: any
} = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env.DATABASE as string, process.env.USERNAME as string, process.env.PASSWORD as string, {
    host: process.env.HOST as string,
    dialect: "mysql"
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(path.join(__dirname, '..', 'src', 'models'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts' || file.slice(-3) === '.js');
  })
  .forEach(file => {
    /* eslint-disable */
    const model = require(path.join(__dirname, '..', 'src', 'models', file)).init(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default sequelize;
